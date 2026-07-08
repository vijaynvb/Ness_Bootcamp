export enum UserRole {
  Employee = 'employee',
  Administrator = 'administrator',
}

export class UserEntity {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: UserRole,
    public isActive: boolean = true,
    public createdAt: string = new Date().toISOString(),
  ) {}
}
