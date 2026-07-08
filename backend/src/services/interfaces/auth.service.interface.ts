export interface AuthServiceInterface {
  register(input: unknown): Promise<unknown>;
  login(input: unknown): Promise<unknown>;
  logout(): Promise<unknown>;
}
