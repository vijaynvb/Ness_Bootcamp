import { SettingsEntity } from '../domain/settings.entity';

export class SettingsRepository {
  private readonly settings: SettingsEntity[] = [];

  findAll(): SettingsEntity[] {
    return this.settings;
  }

  findById(id: string): SettingsEntity | undefined {
    return this.settings.find((setting) => setting.id === id);
  }

  create(setting: SettingsEntity): SettingsEntity {
    this.settings.push(setting);
    return setting;
  }

  update(id: string, updates: Partial<SettingsEntity>): SettingsEntity | undefined {
    const index = this.settings.findIndex((setting) => setting.id === id);
    if (index === -1) {
      return undefined;
    }

    this.settings[index] = { ...this.settings[index], ...updates, updatedAt: new Date().toISOString() };
    return this.settings[index];
  }

  delete(id: string): boolean {
    const index = this.settings.findIndex((setting) => setting.id === id);
    if (index === -1) {
      return false;
    }

    this.settings.splice(index, 1);
    return true;
  }
}
