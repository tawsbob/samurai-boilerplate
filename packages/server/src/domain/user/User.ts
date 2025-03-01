import { Email } from './Email';
import { Password } from './Password';

export class User {
  private id: string | null;
  private readonly email: Email;
  private readonly password: Password;
  private name: string | null;

  private constructor(
    email: Email,
    password: Password,
    name: string | null = null,
    id: string | null = null
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.id = id;
  }

  public static async create(
    email: string,
    plainPassword: string,
    name?: string
  ): Promise<User> {
    const emailObj = Email.create(email);
    const passwordObj = await Password.createHashed(plainPassword);
    return new User(emailObj, passwordObj, name || null);
  }

  public static async reconstitute(
    id: string,
    email: string,
    hashedPassword: string,
    name?: string
  ): Promise<User> {
    const emailObj = Email.create(email);
    const passwordObj = await Password.fromHashed(hashedPassword);
    return new User(emailObj, passwordObj, name || null, id);
  }

  public async verifyPassword(plainPassword: string): Promise<boolean> {
    return this.password.compare(plainPassword);
  }

  public getId(): string {
    if (!this.id) {
      throw new Error('User ID not set');
    }
    return this.id;
  }

  public setId(id: string): void {
    if (this.id) {
      throw new Error('User ID already set');
    }
    this.id = id;
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getHashedPassword(): string {
    return this.password.getHashedValue();
  }

  public getName(): string | null {
    return this.name;
  }

  public setName(name: string | null): void {
    this.name = name;
  }

  public toJSON(): Record<string, any> {
    if (!this.id) {
      throw new Error('User ID not set');
    }
    return {
      id: this.id,
      email: this.email.getValue(),
      name: this.name,
    };
  }
} 