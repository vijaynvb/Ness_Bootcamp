export class SettingsEntity {
  constructor(
    public readonly id: string,
    public outlookEmailAddress: string,
    public syncEnabled: boolean,
    public calendarId: string,
    public pollingIntervalMinutes: number,
    public readonly createdAt: string = new Date().toISOString(),
    public updatedAt: string = new Date().toISOString(),
  ) {}
}
