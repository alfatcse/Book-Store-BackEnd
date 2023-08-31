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
  console.log(result);
  res.cookie('authorization', result.token, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result.UserData,
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
export const UserController = {
  insertIntoDB,
  getAllUsers,
};
