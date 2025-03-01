import { User } from '@/domain/user/User';
import { UserRepository } from '@/domain/user/UserRepository';
import { v4 as uuidv4 } from 'uuid';

export class MockUserRepository implements UserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(u => {
      try {
        return u.getId() === id;
      } catch {
        return false;
      }
    });
    return user || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.getEmail() === email);
    return user || null;
  }

  public async save(user: User): Promise<void> {
    try {
      user.getId();
      // If no error is thrown, the user has an ID
      const index = this.users.findIndex(u => u.getId() === user.getId());
      if (index >= 0) {
        this.users[index] = user;
      } else {
        this.users.push(user);
      }
    } catch {
      // If getId() throws, this is a new user
      user.setId(uuidv4());
      this.users.push(user);
    }
  }

  public async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => {
      try {
        return u.getId() !== id;
      } catch {
        return true;
      }
    });
  }

  // Helper methods for testing
  public async addUser(user: User): Promise<void> {
    await this.save(user);
  }

  public clear(): void {
    this.users = [];
  }
} 