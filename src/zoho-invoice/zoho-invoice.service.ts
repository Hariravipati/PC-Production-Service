import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import { ZohoOAuthService } from './zoho-oauth.service';
import { InvoiceQueryDto } from './dto/invoice-query.dto';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

@Injectable()
export class ZohoInvoiceService {
  private readonly apiDomain: string;
  private readonly organizationId: string;

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
    private readonly oAuth: ZohoOAuthService,
  ) {
    this.apiDomain = this.config.getOrThrow<string>('ZOHO_API_DOMAIN');
    const orgId = this.config.get<string>('ZOHO_ORGANIZATION_ID');
    if (!orgId) throw new BadRequestException('ZOHO_ORGANIZATION_ID is not configured');
    this.organizationId = orgId;
  }

  async getInvoices(query: InvoiceQueryDto): Promise<any> {
    const accessToken = await this.oAuth.getAccessToken();

    const params: Record<string, string> = { organization_id: this.organizationId };
    if (query.page !== undefined) params.page = String(query.page);
    if (query.per_page !== undefined) params.per_page = String(query.per_page);
    if (query.date_start) params.date_start = query.date_start;
    if (query.date_end) params.date_end = query.date_end;
    if (query.status) params.status = query.status;

    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.apiDomain}/invoice/v3/invoices`, {
          params,
          httpsAgent,
          headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
        }),
      );
      return data;
    } catch (err) {
      const zohoError = err?.response?.data;
      throw new InternalServerErrorException(
        zohoError ?? `Zoho API request failed: ${err.message}`,
      );
    }
  }
}
