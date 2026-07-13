export interface SettingsServiceInterface {
  listSettings(page: number, pageSize: number): Promise<unknown>;
  getSettingsById(settingId: string): Promise<unknown>;
  createSettings(input: unknown): Promise<unknown>;
  updateSettings(settingId: string, input: unknown): Promise<unknown>;
  deleteSettings(settingId: string): Promise<unknown>;
}
