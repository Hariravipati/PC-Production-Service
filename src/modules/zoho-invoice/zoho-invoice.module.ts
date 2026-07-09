import { Module } from '@nestjs/common';
import { ZohoInvoiceController } from './zoho-invoice.controller';
import { ZohoInvoiceService } from './zoho-invoice.service';

@Module({
  controllers: [ZohoInvoiceController],
  providers: [ZohoInvoiceService],
  exports: [ZohoInvoiceService],
})
export class ZohoInvoiceModule {}
