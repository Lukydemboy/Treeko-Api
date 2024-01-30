export type UserDto = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  pushToken: string;
  archived: boolean;
  verfied: boolean;
  createdAt: Date;
};

export type UpdateUserDto = Partial<UserDto>;
