import { SettingsServiceInterface } from '../interfaces/settings.service.interface';
import { CreateSettingsRequestDto, UpdateSettingsRequestDto } from '../../dto/settings.dto';
import { validateBody } from '../../dto/validation';
import { AppError } from '../../exceptions/app-error';
import { SettingsRepository } from '../../repositories/settings.repository';
import { SettingsEntity } from '../../domain/settings.entity';
import { v4 as uuidv4 } from 'uuid';

export class SettingsService implements SettingsServiceInterface {
  constructor(private readonly settingsRepository = new SettingsRepository()) {}

  async listSettings(page: number, pageSize: number): Promise<unknown> {
    const settings = this.settingsRepository.findAll();

    return {
      items: settings.slice((page - 1) * pageSize, page * pageSize),
      pagination: {
        page,
        pageSize,
        totalItems: settings.length,
        totalPages: Math.ceil(settings.length / pageSize),
      },
    };
  }

  async getSettingsById(settingId: string): Promise<unknown> {
    const setting = this.settingsRepository.findById(settingId);
    if (!setting) {
      throw new AppError('SETTING_NOT_FOUND', 'Outlook integration settings were not found.', 404);
    }
    return setting;
  }

  async createSettings(input: unknown): Promise<unknown> {
    const dto = await validateBody(CreateSettingsRequestDto, input);
    const setting = new SettingsEntity(uuidv4(), dto.outlookEmailAddress, dto.syncEnabled, dto.calendarId ?? 'primary', dto.pollingIntervalMinutes ?? 15);
    this.settingsRepository.create(setting);
    return setting;
  }

  async updateSettings(settingId: string, input: unknown): Promise<unknown> {
    const dto = await validateBody(UpdateSettingsRequestDto, input);
    const updatedSetting = this.settingsRepository.update(settingId, dto);
    if (!updatedSetting) {
      throw new AppError('SETTING_NOT_FOUND', 'Outlook integration settings were not found.', 404);
    }
    return updatedSetting;
  }

  async deleteSettings(settingId: string): Promise<unknown> {
    const deleted = this.settingsRepository.delete(settingId);
    if (!deleted) {
      throw new AppError('SETTING_NOT_FOUND', 'Outlook integration settings were not found.', 404);
    }
    return { success: true };
  }
}
