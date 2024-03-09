import { UserEntity } from 'src/database/entities/user.entity';

export class UserDto {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  verfied: boolean;
  createdAt: Date;
  deletedAt: Date | null;

  static from(user: UserEntity): UserDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      verfied: user.verified,
      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
    };
  }
}

export class CompleteProfileDto {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
}

export type UpdateUserDto = Partial<UserDto>;
