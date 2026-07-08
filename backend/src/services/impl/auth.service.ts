import { AuthServiceInterface } from '../interfaces/auth.service.interface';
import { RegisterRequestDto, LoginRequestDto } from '../../dto/auth.dto';
import { validateBody } from '../../dto/validation';
import { AppError } from '../../exceptions/app-error';
import { UserRepository } from '../../repositories/user.repository';
import { UserEntity, UserRole } from '../../domain/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class AuthService implements AuthServiceInterface {
  constructor(private readonly userRepository = new UserRepository()) {}

  async register(input: unknown): Promise<unknown> {
    const dto = await validateBody(RegisterRequestDto, input);
    const existingUser = this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new AppError('USER_EXISTS', 'A user with that email already exists.', 400);
    }

    const user = new UserEntity(uuidv4(), dto.firstName, dto.lastName, dto.email, dto.role);
    this.userRepository.create(user);

    return {
      user,
      token: 'jwt-placeholder-token',
    };
  }

  async login(input: unknown): Promise<unknown> {
    const dto = await validateBody(LoginRequestDto, input);
    const user = this.userRepository.findByEmail(dto.email);

    if (!user || dto.password.length < 8) {
      throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password.', 400);
    }

    return {
      user,
      token: 'jwt-placeholder-token',
    };
  }

  async logout(): Promise<unknown> {
    return { success: true };
  }
}
