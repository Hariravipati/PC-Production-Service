import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ZohoInvoiceController } from './zoho-invoice.controller';
import { ZohoInvoiceService } from './zoho-invoice.service';
import { ZohoOAuthService } from './zoho-oauth.service';
import * as https from 'https';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    }),
    ConfigModule,
  ],
  controllers: [ZohoInvoiceController],
  providers: [ZohoInvoiceService, ZohoOAuthService],
})
export class ZohoInvoiceModule {}
