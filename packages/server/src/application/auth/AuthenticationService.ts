import { User } from '@/domain/user/User';
import { UserRepository } from '@/domain/user/UserRepository';
import { TokenService } from '@/infrastructure/security/TokenService';

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class RegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RegistrationError';
  }
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
  };
  token: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  name?: string;
}

export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  public async register(data: RegistrationData): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new RegistrationError('Email already registered');
    }

    const user = await User.create(
      data.email,
      data.password,
      data.name
    );

    await this.userRepository.save(user);

    const token = this.tokenService.generateToken({
      userId: user.getId(),
      email: user.getEmail(),
    });

    return {
      user: {
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
      },
      token,
    };
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    if (!email || !password) {
      throw new AuthenticationError('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    const token = this.tokenService.generateToken({
      userId: user.getId(),
      email: user.getEmail(),
    });

    return {
      user: {
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
      },
      token,
    };
  }
} 