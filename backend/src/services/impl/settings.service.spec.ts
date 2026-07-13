import { SettingsService } from './settings.service';
import { AppError } from '../../exceptions/app-error';

describe('SettingsService', () => {
  it('creates a new outlook integration setting', async () => {
    const service = new SettingsService();

    const result = (await service.createSettings({
      outlookEmailAddress: 'user@example.com',
      syncEnabled: true,
      calendarId: 'primary',
      pollingIntervalMinutes: 15,
    })) as {
      id: string;
      outlookEmailAddress: string;
      syncEnabled: boolean;
      calendarId: string;
      pollingIntervalMinutes: number;
    };

    expect(result).toMatchObject({
      outlookEmailAddress: 'user@example.com',
      syncEnabled: true,
      calendarId: 'primary',
      pollingIntervalMinutes: 15,
    });
    expect(result.id).toBeDefined();
  });

  it('throws a not found error when updating a missing setting', async () => {
    const service = new SettingsService();

    await expect(service.updateSettings('missing-setting', { syncEnabled: false })).rejects.toEqual(
      expect.objectContaining({
        code: 'SETTING_NOT_FOUND',
        statusCode: 404,
      }),
    );
  });
});
