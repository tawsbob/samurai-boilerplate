import {
  AuthenticationService,
  AuthenticationError,
  RegistrationError,
} from '@/application/auth/AuthenticationService';
import { User } from '@/domain/user/User';
import { MockUserRepository } from '@/test/mocks/MockUserRepository';
import { MockTokenService } from '@/test/mocks/MockTokenService';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let userRepository: MockUserRepository;
  let tokenService: MockTokenService;
  let testUser: User;

  beforeEach(async () => {
    userRepository = new MockUserRepository();
    tokenService = new MockTokenService();
    authService = new AuthenticationService(userRepository, tokenService);

    // Create a test user
    testUser = await User.create(
      'test@example.com',
      'Password123',
      'Test User'
    );
    await userRepository.addUser(testUser);
  });

  afterEach(() => {
    userRepository.clear();
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const registrationData = {
        email: 'new@example.com',
        password: 'NewPassword123',
        name: 'New User',
      };

      const result = await authService.register(registrationData);

      expect(result.user).toEqual({
        id: expect.any(String),
        email: registrationData.email,
        name: registrationData.name,
      });
      expect(result.token).toBe(MockTokenService.getMockToken());
    });

    it('should register a user without a name', async () => {
      const registrationData = {
        email: 'new@example.com',
        password: 'NewPassword123',
      };

      const result = await authService.register(registrationData);

      expect(result.user).toEqual({
        id: expect.any(String),
        email: registrationData.email,
        name: null,
      });
    });

    it('should throw RegistrationError for existing email', async () => {
      const registrationData = {
        email: 'test@example.com', // Email already used by testUser
        password: 'NewPassword123',
      };

      await expect(
        authService.register(registrationData)
      ).rejects.toThrow(RegistrationError);
    });

    it('should throw error for invalid email format', async () => {
      const registrationData = {
        email: 'invalid-email',
        password: 'Password123',
      };

      await expect(
        authService.register(registrationData)
      ).rejects.toThrow('Invalid email format');
    });

    it('should throw error for invalid password format', async () => {
      const registrationData = {
        email: 'new@example.com',
        password: 'weak', // Doesn't meet password requirements
      };

      await expect(
        authService.register(registrationData)
      ).rejects.toThrow('Invalid password format');
    });
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const result = await authService.login('test@example.com', 'Password123');

      expect(result).toEqual({
        user: {
          id: testUser.getId(),
          email: testUser.getEmail(),
          name: testUser.getName(),
        },
        token: MockTokenService.getMockToken(),
      });
    });

    it('should throw AuthenticationError for non-existent user', async () => {
      await expect(
        authService.login('nonexistent@example.com', 'Password123')
      ).rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError for invalid password', async () => {
      await expect(
        authService.login('test@example.com', 'WrongPassword123')
      ).rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError for empty email', async () => {
      await expect(
        authService.login('', 'Password123')
      ).rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError for empty password', async () => {
      await expect(
        authService.login('test@example.com', '')
      ).rejects.toThrow(AuthenticationError);
    });
  });
}); 