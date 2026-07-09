import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

@Injectable()
export class ZohoInvoiceService {
  private accessToken: string;
  private tokenExpiry: number = 0;

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        `${process.env.ZOHO_ACCOUNT_DOMAIN}/oauth/v2/token`,
        null,
        {
          params: {
            refresh_token: process.env.ZOHO_REFRESH_TOKEN,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            grant_type: 'refresh_token',
          },
          httpsAgent,
        },
      );

      if (!response.data.access_token) {
        throw new HttpException(`Zoho token error: ${JSON.stringify(response.data)}`, HttpStatus.UNAUTHORIZED);
      }

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + 3500 * 1000;
      return this.accessToken;
    } catch (error) {
      throw new HttpException(
        `Zoho auth failed: ${error.response?.data ? JSON.stringify(error.response.data) : error.message}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getInvoice(invoiceId: string) {
    const token = await this.getAccessToken();
    const response = await axios.get(
      `${process.env.ZOHO_API_DOMAIN}/invoice/v3/invoices/${invoiceId}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'X-com-zoho-invoice-organizationid': process.env.ZOHO_ORGANIZATION_ID,
          'Accept-Encoding': 'identity',
        },
        httpsAgent,
        maxContentLength: Infinity,
      },
    );

    const invoice = response.data.invoice;
    return {
      invoice_id: invoice.invoice_id,
      invoice_number: invoice.invoice_number,
      po_number: invoice.reference_number || invoice.custom_field_hash?.cf_po || '',
      date: invoice.date,
      due_date: invoice.due_date,
      status: invoice.status,
      sub_total: invoice.sub_total,
      total: invoice.total,
      customer_name: invoice.customer_name,
      line_items: invoice.line_items.map((item: any, index: number) => ({
        sr_no: index + 1,
        item_id: item.item_id,
        name: item.name,
        description: item.description,
        hsn_or_sac: item.hsn_or_sac,
        quantity: item.quantity,
        unit: item.unit,
        rate: item.rate,
        tax_percentage: item.tax_percentage,
        cgst_percentage: item.tax_percentage / 2,
        cgst_amount: item.tax_amount / 2,
        sgst_percentage: item.tax_percentage / 2,
        sgst_amount: item.tax_amount / 2,
        item_total: item.item_total,
      })),
    };
  }

  async getCOC(invoiceNumber: string) {
    const token = await this.getAccessToken();
    const response = await axios.get(
      `${process.env.ZOHO_API_DOMAIN}/invoice/v3/invoices`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'X-com-zoho-invoice-organizationid': process.env.ZOHO_ORGANIZATION_ID,
          'Accept-Encoding': 'identity',
        },
        params: { invoice_number: invoiceNumber },
        httpsAgent,
        maxContentLength: Infinity,
      },
    );

    const invoices = response.data.invoices;
    if (!invoices || invoices.length === 0) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }

    const invoice = await this.getInvoice(invoices[0].invoice_id);
    return {
      date: invoice.date,
      customer: invoice.customer_name,
      po_number: invoice.po_number,
      invoice_number: invoice.invoice_number,
      items: invoice.line_items.map((item) => ({
        sr_no: item.sr_no,
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
      })),
    };
  }

  async getInvoicesGroupedByCustomer(page: number = 1) {
    const token = await this.getAccessToken();
    const response = await axios.get(
      `${process.env.ZOHO_API_DOMAIN}/invoice/v3/invoices`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'X-com-zoho-invoice-organizationid': process.env.ZOHO_ORGANIZATION_ID,
          'Accept-Encoding': 'identity',
        },
        params: { page: Number(page), per_page: 25 },
        httpsAgent,
        maxContentLength: Infinity,
      },
    );

    const grouped = {};
    response.data.invoices.forEach((invoice: any) => {
      const name = invoice.customer_name;
      if (!grouped[name]) {
        grouped[name] = { customer_name: name, invoice_numbers: [] };
      }
      grouped[name].invoice_numbers.push(invoice.invoice_number);
    });

    return Object.values(grouped);
  }

  async getInvoices(page: number = 1) {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(
        `${process.env.ZOHO_API_DOMAIN}/invoice/v3/invoices`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            'X-com-zoho-invoice-organizationid': process.env.ZOHO_ORGANIZATION_ID,
            'Accept-Encoding': 'identity',
          },
          params: { page: Number(page), per_page: 25 },
          httpsAgent,
          decompress: true,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        },
      );

      return response.data.invoices.map((invoice: any) => ({
        invoice_id: invoice.invoice_id,
        invoice_number: invoice.invoice_number,
        po_number: invoice.reference_number || invoice.custom_field_hash?.cf_po || '',
        date: invoice.date,
        due_date: invoice.due_date,
        status: invoice.status,
        total: invoice.total,
        customer_name: invoice.customer_name,
      }));
    } catch (error) {
      throw new HttpException(
        `Zoho API error: ${error.response?.data ? JSON.stringify(error.response.data) : error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
