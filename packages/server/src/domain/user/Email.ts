export class Email {
  private readonly value: string;

  private constructor(email: string) {
    this.value = email;
  }

  public static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new Error('Invalid email format');
    }
    return new Email(email);
  }

  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
} 