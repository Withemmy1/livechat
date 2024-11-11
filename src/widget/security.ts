import { createHmac } from 'crypto';

// Security utilities for widget authentication and validation
export class SecurityManager {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  // Generate HMAC signature for request validation
  public generateSignature(payload: string): string {
    return createHmac('sha256', this.secretKey)
      .update(payload)
      .digest('hex');
  }

  // Validate incoming requests
  public validateRequest(payload: string, signature: string): boolean {
    const expectedSignature = this.generateSignature(payload);
    return expectedSignature === signature;
  }

  // Generate secure session token
  public generateSessionToken(userId: string): string {
    const timestamp = Date.now();
    const payload = `${userId}:${timestamp}`;
    return Buffer.from(payload).toString('base64');
  }

  // CSP configuration
  public getCSPHeaders(): Record<string, string> {
    return {
      'Content-Security-Policy': [
        "default-src 'none'",
        "script-src 'self' https://widget.chatflow.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.chatflow.com",
        "frame-src 'self'",
        "frame-ancestors 'self'",
      ].join('; '),
    };
  }
}