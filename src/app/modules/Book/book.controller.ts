import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constants';
import { BookService } from './book.service';
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Created Successfully',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched Successfully',
    data: result,
  });
});
const getAllBook = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBooks(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched Successfully',
    data: result,
  });
});
const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateSingleBook(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Updated Successfully',
    data: result,
  });
});
const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteSingleBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Deleted Successfully',
    data: result,
  });
});
const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortBy',
    'sortOrder',
  ]);
  const result = await BookService.getBooksByCategoryId(
    req.params.categoryId,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    data: result,
  });
});
export const BookController = {
  insertIntoDB,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  getBooksByCategoryId,
  getAllBook,
};
