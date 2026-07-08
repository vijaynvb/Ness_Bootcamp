export interface UserServiceInterface {
  listUsers(page: number, pageSize: number): Promise<unknown>;
  getUserById(userId: string): Promise<unknown>;
  createUser(input: unknown): Promise<unknown>;
  updateUser(userId: string, input: unknown): Promise<unknown>;
  deleteUser(userId: string): Promise<unknown>;
}
