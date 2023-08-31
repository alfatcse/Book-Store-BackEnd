import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IUser } from './user.interface';
const insertIntoDB = async (data: User): Promise<IUser> => {
  const pass = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );
  data.password = pass;
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Unable to create User');
  }
  const token = jwtHelpers.createToken(
    { userId: result?.id, role: result?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { UserData: result, token: token };
};
const getAllUsers = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};
export const UserService = {
  insertIntoDB,
  getAllUsers,
};
