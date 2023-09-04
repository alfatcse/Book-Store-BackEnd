import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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
export const BookService = {
  insertIntoDB,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
