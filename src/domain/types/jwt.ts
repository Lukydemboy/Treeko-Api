export type JwtUser = {
  id: string;
};

export type JwtUserWithAccessToken = JwtUser & { accessToken: string };
export type AuthorizedRequest = Request & { user: JwtUserWithAccessToken };
