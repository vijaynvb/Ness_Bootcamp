import { UserServiceInterface } from '../interfaces/user.service.interface';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../../dto/user.dto';
import { validateBody } from '../../dto/validation';
import { AppError } from '../../exceptions/app-error';
import { UserRepository } from '../../repositories/user.repository';
import { UserEntity, UserRole } from '../../domain/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository = new UserRepository()) {}

  async listUsers(page: number, pageSize: number): Promise<unknown> {
    const users = this.userRepository.findAll();
    return {
      items: users.slice((page - 1) * pageSize, page * pageSize),
      pagination: {
        page,
        pageSize,
        totalItems: users.length,
        totalPages: Math.ceil(users.length / pageSize),
      },
    };
  }

  async getUserById(userId: string): Promise<unknown> {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('USER_NOT_FOUND', 'User not found.', 404);
    }
    return user;
  }

  async createUser(input: unknown): Promise<unknown> {
    const dto = await validateBody(CreateUserRequestDto, input);
    const user = new UserEntity(uuidv4(), dto.firstName, dto.lastName, dto.email, dto.role);
    this.userRepository.create(user);
    return user;
  }

  async updateUser(userId: string, input: unknown): Promise<unknown> {
    const dto = await validateBody(UpdateUserRequestDto, input);
    const updatedUser = this.userRepository.update(userId, dto);
    if (!updatedUser) {
      throw new AppError('USER_NOT_FOUND', 'User not found.', 404);
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<unknown> {
    const deleted = this.userRepository.delete(userId);
    if (!deleted) {
      throw new AppError('USER_NOT_FOUND', 'User not found.', 404);
    }
    return { success: true };
  }
}
