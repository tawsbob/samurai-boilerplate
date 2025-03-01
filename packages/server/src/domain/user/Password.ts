import * as bcrypt from 'bcryptjs';

export class Password {
  private readonly hashedValue: string;

  private constructor(hashedPassword: string) {
    this.hashedValue = hashedPassword;
  }

  public static async createHashed(plainPassword: string): Promise<Password> {
    if (!this.isValid(plainPassword)) {
      throw new Error('Invalid password format');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return new Password(hashedPassword);
  }

  public static async fromHashed(hashedPassword: string): Promise<Password> {
    return new Password(hashedPassword);
  }

  private static isValid(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  public async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.hashedValue);
  }

  public getHashedValue(): string {
    return this.hashedValue;
  }
} 