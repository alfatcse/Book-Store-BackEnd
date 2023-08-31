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
  res.cookie('token', result.token, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result.UserData,
  });
});
export const UserController = {
  insertIntoDB,
};
