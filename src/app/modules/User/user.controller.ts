import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDB(req.body);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('authorization', result.token, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result.UserData,
  });
});
const UserSignIn = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.UserSignIn(req.body);
  console.log(result);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('authorization', result.token, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User SignIn Successfully',
    token: result.token,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  //   let verifiedToken = null;
  //   try {
  //     verifiedToken = jwtHelpers.verifyToken(
  //       req.cookies.token,
  //       config.jwt.secret as Secret
  //     );
  //   } catch (error) {
  //     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
  //   }
  //   if (verifiedToken.role === 'admin') {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved Successfully',
    data: result,
  });
  //   } else {
  //     throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized Access');
  //   }
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User data retrieved Successfully',
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteSingleUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User data deleted Successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateSingleUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User data updated Successfully',
    data: result,
  });
});
export const UserController = {
  insertIntoDB,
  getAllUsers,
  UserSignIn,
  getSingleUser,
  deleteSingleUser,
  updateUser,
};
