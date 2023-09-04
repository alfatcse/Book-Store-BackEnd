import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Created Successfully',
    data: result,
  });
});
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Category fetched Successfully',
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category fetched Successfully',
    data: result,
  });
});
const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteSingleCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category deleted Successfully',
    data: result,
  });
});
const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateSingleCategory(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category data updated Successfully',
    data: result,
  });
});
export const CategoryController = {
  insertIntoDB,
  getAllCategory,
  getSingleCategory,
  deleteSingleCategory,
  updateSingleCategory,
};
