import { User } from "src/user/types/user.type";

export type Credentials = {
  email: string;
  password: string;
  remember: boolean;
  name: string;
  username: string;
};

export type RefreshTokenParams = Pick<User, "userId">;
