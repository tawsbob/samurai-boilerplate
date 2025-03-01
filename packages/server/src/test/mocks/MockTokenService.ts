import { TokenService, TokenPayload } from '@/infrastructure/security/TokenService';

export class MockTokenService implements TokenService {
  private static readonly MOCK_TOKEN = 'mock-jwt-token';

  public generateToken(payload: TokenPayload): string {
    return MockTokenService.MOCK_TOKEN;
  }

  public verifyToken(token: string): TokenPayload {
    if (token !== MockTokenService.MOCK_TOKEN) {
      throw new Error('Invalid token');
    }
    return {
      userId: 'test-user-id',
      email: 'test@example.com',
    };
  }

  // Helper method to get the mock token for assertions
  public static getMockToken(): string {
    return MockTokenService.MOCK_TOKEN;
  }
} 