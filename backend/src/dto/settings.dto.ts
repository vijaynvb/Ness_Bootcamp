import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateSettingsRequestDto {
  @IsEmail()
  outlookEmailAddress!: string;

  @IsBoolean()
  syncEnabled!: boolean;

  @IsOptional()
  @IsString()
  calendarId?: string;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(1440)
  pollingIntervalMinutes?: number;
}

export class UpdateSettingsRequestDto {
  @IsOptional()
  @IsEmail()
  outlookEmailAddress?: string;

  @IsOptional()
  @IsBoolean()
  syncEnabled?: boolean;

  @IsOptional()
  @IsString()
  calendarId?: string;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(1440)
  pollingIntervalMinutes?: number;
}
