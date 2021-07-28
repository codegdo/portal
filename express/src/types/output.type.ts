interface UserData {
  emailAddress: string;
  username: string;
}
export interface LoginOutput {
  user: UserData;
  token: string;
}
