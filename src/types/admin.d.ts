export interface UserItem {
  userId: number;
  profileUrl: string;
  username?: string;
  name?: string;
  email: string;
  role: string;
}
export interface GetUsersResponse {
  nextCursor?: number | null;
  hasNext: boolean;
  items: UserItem[];
}

export interface UserRole {
  userId: number;
  role: string;
}
