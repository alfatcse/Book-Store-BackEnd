import { User } from '@prisma/client';

export type IUser = {
  UserData: Partial<User>;
  token: string;
};
export type ISignInUser = {
  email: string;
  password: string;
};
export type ISignInResponse = {
  token: string;
};
