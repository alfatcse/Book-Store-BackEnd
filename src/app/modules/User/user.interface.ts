import { User } from '@prisma/client';

export type IUser = {
  UserData: Partial<User>;
  token: string;
};
