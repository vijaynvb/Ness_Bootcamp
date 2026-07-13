import { Router, Request, Response, NextFunction } from 'express';
import { SettingsService } from '../services/impl/settings.service';

export class SettingsController {
  public readonly router = Router();

  constructor(private readonly settingsService = new SettingsService()) {
    this.router.get('/', this.listSettings.bind(this));
    this.router.post('/', this.createSettings.bind(this));
    this.router.get('/:settingId', this.getSettingsById.bind(this));
    this.router.patch('/:settingId', this.updateSettings.bind(this));
    this.router.delete('/:settingId', this.deleteSettings.bind(this));
  }

  /**
   * Lists Outlook integration settings for the current tenant.
   * Returns a paginated response with a 200 status on success.
   */
  private async listSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page ?? 1);
      const pageSize = Number(req.query.pageSize ?? 20);
      const result = await this.settingsService.listSettings(page, pageSize);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Creates a new Outlook integration setting.
   * Accepts a JSON payload with the provider configuration and returns the created setting with 201.
   */
  private async createSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.settingsService.createSettings(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetches a single Outlook integration setting by ID.
   * Returns 200 for a found setting and 404 when the setting does not exist.
   */
  private async getSettingsById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.settingsService.getSettingsById(req.params.settingId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an existing Outlook integration setting.
   * Supports partial updates and returns 200 on success or 404 when the setting is missing.
   */
  private async updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.settingsService.updateSettings(req.params.settingId, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes an Outlook integration setting by ID.
   * Returns 200 with a success payload when deleted, or 404 when the setting is missing.
   */
  private async deleteSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.settingsService.deleteSettings(req.params.settingId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
