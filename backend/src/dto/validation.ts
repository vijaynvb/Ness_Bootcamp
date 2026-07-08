import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { AppError } from '../exceptions/app-error';

export async function validateBody<T extends object>(
  dtoClass: ClassConstructor<T>,
  payload: unknown,
): Promise<T> {
  const dto = plainToInstance(dtoClass, payload);
  const errors = await validate(dto as object, { whitelist: true, forbidNonWhitelisted: true });

  if (errors.length > 0) {
    const details = errors.map((error: ValidationError) => ({
      field: error.property,
      constraints: error.constraints,
    }));
    throw new AppError('INVALID_REQUEST', 'Validation failed', 400, details);
  }

  return dto;
}
