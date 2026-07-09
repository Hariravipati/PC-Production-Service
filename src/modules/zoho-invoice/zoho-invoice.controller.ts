import { Controller, Get, Param, Query } from '@nestjs/common';
import { ZohoInvoiceService } from './zoho-invoice.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('zoho-invoices')
@Public()
export class ZohoInvoiceController {
  constructor(private readonly zohoInvoiceService: ZohoInvoiceService) {}

  @Get()
  async getInvoices(@Query('page') page?: string) {
    return this.zohoInvoiceService.getInvoices(Number(page) || 1);
  }

  @Get('grouped-by-customer')
  async getInvoicesGroupedByCustomer(@Query('page') page?: string) {
    return this.zohoInvoiceService.getInvoicesGroupedByCustomer(Number(page) || 1);
  }

  @Get('coc/:invoiceNumber')
  async getCOC(@Param('invoiceNumber') invoiceNumber: string) {
    return this.zohoInvoiceService.getCOC(invoiceNumber);
  }

  @Get(':invoiceId')
  async getInvoice(@Param('invoiceId') invoiceId: string) {
    return this.zohoInvoiceService.getInvoice(invoiceId);
  }
}
