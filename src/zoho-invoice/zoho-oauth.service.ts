import { Injectable, InternalServerErrorException, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

const ENV_FILE = path.resolve(process.cwd(), '.env');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

@Injectable()
export class ZohoOAuthService {
  private readonly logger = new Logger(ZohoOAuthService.name);
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly accountDomain: string;

  private refreshToken: string | null = null;
  private cachedAccessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {
    this.clientId = this.config.getOrThrow<string>('ZOHO_CLIENT_ID');
    this.clientSecret = this.config.getOrThrow<string>('ZOHO_CLIENT_SECRET');
    this.accountDomain = this.config.getOrThrow<string>('ZOHO_ACCOUNT_DOMAIN');
    this.refreshToken = this.config.get<string>('ZOHO_REFRESH_TOKEN') || null;
    this.logger.log(`[INIT] clientId: ${this.clientId}`);
    this.logger.log(`[INIT] refreshToken present: ${!!this.refreshToken}`);
  }

  async exchangeCodeForRefreshToken(code: string): Promise<{ access_token: string; refresh_token: string }> {
    this.logger.log(`[INIT] Exchanging self-client code for tokens...`);

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
    });

    try {
      const { data } = await firstValueFrom(
        this.http.post(`${this.accountDomain}/oauth/v2/token`, params.toString(), {
          httpsAgent,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      this.logger.log(`[INIT] Token response: ${JSON.stringify(data)}`);

      if (data.error) {
        throw new UnauthorizedException(`Code exchange failed: ${data.error}`);
      }

      this.refreshToken = data.refresh_token;
      this.cachedAccessToken = data.access_token;
      this.tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
      this.persistRefreshToken(data.refresh_token);

      this.logger.log(`[INIT] Tokens saved. ZOHO_REFRESH_TOKEN written to .env`);
      return { access_token: data.access_token, refresh_token: data.refresh_token };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException(`Code exchange failed: ${err.message}`);
    }
  }

  async getAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new UnauthorizedException(
        'ZOHO_REFRESH_TOKEN not set. Call POST /zoho/init with your Zoho Self Client code first.',
      );
    }

    const now = Date.now();
    if (this.cachedAccessToken && now < this.tokenExpiresAt) {
      this.logger.log('[TOKEN] Using cached access token');
      return this.cachedAccessToken;
    }

    this.logger.log('[TOKEN] Refreshing access token...');
    return this.refreshAccessToken();
  }

  private async refreshAccessToken(): Promise<string> {
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    try {
      const { data } = await firstValueFrom(
        this.http.post(`${this.accountDomain}/oauth/v2/token`, params.toString(), {
          httpsAgent,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      this.logger.log(`[REFRESH] Response: ${JSON.stringify(data)}`);

      if (data.error) {
        throw new UnauthorizedException(`Token refresh failed: ${data.error}`);
      }

      this.cachedAccessToken = data.access_token;
      this.tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
      this.logger.log('[REFRESH] Access token refreshed and cached');
      return this.cachedAccessToken;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException(`Token refresh failed: ${err.message}`);
    }
  }

  private persistRefreshToken(refreshToken: string): void {
    try {
      let envContent = fs.readFileSync(ENV_FILE, 'utf-8');
      if (envContent.includes('ZOHO_REFRESH_TOKEN=')) {
        envContent = envContent.replace(/ZOHO_REFRESH_TOKEN=.*/, `ZOHO_REFRESH_TOKEN=${refreshToken}`);
      } else {
        envContent += `\nZOHO_REFRESH_TOKEN=${refreshToken}`;
      }
      fs.writeFileSync(ENV_FILE, envContent);
      this.logger.log('[PERSIST] ZOHO_REFRESH_TOKEN written to .env');
    } catch (err) {
      this.logger.warn(`[PERSIST] Could not write to .env: ${err.message}`);
    }
  }
}
