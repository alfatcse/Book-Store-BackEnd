import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IBook } from './book.interface';

const insertIntoDB = async (data: IBook): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};
const getSingleBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
  }
  return result;
};
const updateSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Partial<Book> | null> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      title: true,
      author: true,
      genre: true,
      price: true,
      publicationDate: true,
      categoryId: true,
    },
  });
  return result;
};
const deleteSingleBook = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
  }
  return result;
};
const getBooksByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<Book[]>>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.book.findMany({
    where: { categoryId: categoryId },
    skip,
    take: limit,
    include: { category: true },
  });
  const total = await prisma.book.count({ where: { categoryId: categoryId } });
  return { meta: { total, page, limit }, data: result };
};
export const BookService = {
  insertIntoDB,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  getBooksByCategoryId,
};
