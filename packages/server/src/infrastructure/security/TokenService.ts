import * as jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface TokenService {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
}

export class JwtTokenService implements TokenService {
  constructor(private readonly secretKey: string) {}

  public generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
  }

  public verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secretKey) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
} 