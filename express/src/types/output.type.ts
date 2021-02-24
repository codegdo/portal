interface UserData {
  email: string;
  username: string;
}
export interface LoginOutput {
  user: UserData;
  token: string;
}
