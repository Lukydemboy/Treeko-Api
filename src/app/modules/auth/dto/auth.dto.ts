export type RegisterDto = {
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthTokensDto = {
  accessToken: string;
  refreshToken: string;
};
