export interface NewToken {
  accessToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ExistingUserLogin extends AuthTokens {
  isNew: false;
}

interface FirstTimeUserLogin {
  userId: number;
  nickname: string;
  isNew: true;
}

export type KakaoLogin = ExistingUserLogin | FirstTimeUserLogin;
