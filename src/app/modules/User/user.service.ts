import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ISignInResponse, ISignInUser, IUser } from './user.interface';
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
const UserSignIn = async (data: ISignInUser): Promise<ISignInResponse> => {
  const { email } = data;
  const result = await prisma.user.findFirst({
    where: { email },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const passwordMatch = await bcrypt.compare(data.password, result?.password);
  if (passwordMatch) {
    const token = jwtHelpers.createToken(
      { userId: result?.id, role: result?.role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return {
      token: token,
    };
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not matched');
  }
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
const getSingleUser = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: { id },
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
const deleteSingleUser = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.delete({
    where: { id },
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
const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User | null>> => {
  if (payload.password) {
    const pass = await bcrypt.hash(
      payload.password,
      Number(config.bycrypt_salt_rounds)
    );
    payload.password = pass;
  }
  const result = await prisma.user.update({
    where: { id },
    data: payload,
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
const getProfile = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      password: true,
    },
  });
  return result;
};
export const UserService = {
  insertIntoDB,
  getAllUsers,
  UserSignIn,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  getProfile,
};
