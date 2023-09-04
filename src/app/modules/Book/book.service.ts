import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalMapper,
  bookSearchableFields,
} from './book.constants';
import { IBook, IBookFilterRequest } from './book.interface';
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
const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          if (key === 'minPrice') {
            return {
              ['price']: {
                gte: parseFloat((filterData as any)[key]),
              },
            };
          } else if (key === 'maxPrice') {
            return {
              ['price']: {
                lte: parseFloat((filterData as any)[key]),
              },
            };
          } else {
            return {
              [key]: {
                equals: (filterData as any)[key],
              },
            };
          }
        }
      }),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  console.log(whereConditions.AND);
  const result = await prisma.book.findMany({
    include: { category: true },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count({ where: whereConditions });
  return { meta: { total, page, limit }, data: result };
};
export const BookService = {
  insertIntoDB,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  getBooksByCategoryId,
  getAllBooks,
};
