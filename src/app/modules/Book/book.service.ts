import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IBook } from './book.interface';

const insertIntoDB = async (data: IBook): Promise<Book> => {
  const result = await prisma.book.create({ data });
  return result;
};
export const BookService = {
  insertIntoDB,
};
