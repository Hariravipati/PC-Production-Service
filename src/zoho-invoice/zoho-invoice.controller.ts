import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ZohoOAuthService } from './zoho-oauth.service';
import { ZohoInvoiceService } from './zoho-invoice.service';
import { InvoiceQueryDto } from './dto/invoice-query.dto';
import { ZohoInitDto } from './dto/zoho-init.dto';
import { Public } from '../modules/auth/decorators/public.decorator';

@Public()
@Controller('zoho')
export class ZohoInvoiceController {
  constructor(
    private readonly oAuth: ZohoOAuthService,
    private readonly invoiceService: ZohoInvoiceService,
  ) {}

  // Step 1: Call this once with your Zoho Self Client code
  // POST /zoho/init  { "code": "1000.xxxx" }
  @Post('init')
  async init(@Body() body: ZohoInitDto): Promise<any> {
    const tokens = await this.oAuth.exchangeCodeForRefreshToken(body.code);
    return {
      message: 'Zoho initialized successfully. You can now call GET /zoho/invoices',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  // Step 2: Fetch invoices
  // GET /zoho/invoices?date_start=2026-01-01&date_end=2026-07-09
  @Get('invoices')
  async getInvoices(@Query() query: InvoiceQueryDto): Promise<any> {
    return this.invoiceService.getInvoices(query);
  }
}
