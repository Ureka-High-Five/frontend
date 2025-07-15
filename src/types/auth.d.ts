export interface AccessToken {
  accessToken: string;
}

interface AuthTokens extends AccessToken {
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
