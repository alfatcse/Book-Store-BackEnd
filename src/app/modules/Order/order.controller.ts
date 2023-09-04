import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization;
  let verifiedUser = null;
  if (token) {
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  }
  req.body.userId = verifiedUser?.userId;
  const result = await OrderService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});
const getAllOrdersCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization;
  let verifiedUser = null;
  if (token) {
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  }
  const id = verifiedUser?.userId;
  console.log(id);
  let result;
  if (id) {
    result = await OrderService.getAllOrdersOfCustomers(id);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});
const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization;
  let verifiedUser = null;
  if (token) {
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  }
  const userId = verifiedUser?.userId;
  let result;
  if (userId) {
    result = await OrderService.getOrderById(req.params.orderId, userId);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});
export const OrderController = {
  insertIntoDB,
  getAllOrders,
  getAllOrdersCustomer,
  getSingleOrder,
  getOrderById,
};
