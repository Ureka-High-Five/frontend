export interface NewToken {
  accessToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface ExistingUserLogin extends AuthTokens {
  isNew: false;
}

interface FirstTimeUserLogin {
  userId: number;
  name: string;
  isNew: true;
}

export type KakaoLogin = ExistingUserLogin | FirstTimeUserLogin;
