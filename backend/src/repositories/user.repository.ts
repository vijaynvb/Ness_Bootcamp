import { UserEntity, UserRole } from '../domain/user.entity';

export class UserRepository {
  private readonly users: UserEntity[] = [
    new UserEntity('usr_001', 'Jane', 'Doe', 'jane.doe@example.com', UserRole.Employee),
    new UserEntity('usr_002', 'John', 'Smith', 'john.smith@example.com', UserRole.Administrator),
  ];

  findAll(): UserEntity[] {
    return this.users;
  }

  findById(id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): UserEntity | undefined {
    return this.users.find((user) => user.email === email);
  }

  create(user: UserEntity): UserEntity {
    this.users.push(user);
    return user;
  }

  update(id: string, updates: Partial<UserEntity>): UserEntity | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return undefined;
    }

    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }
}
