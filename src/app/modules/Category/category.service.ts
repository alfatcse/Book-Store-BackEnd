import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICategory } from './category.interface';

const insertIntoDB = async (data: ICategory): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};
const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({});
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({ where: { id } });
  return result;
};
const deleteSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateSingleCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      title: true,
    },
  });
  return result;
};
export const CategoryService = {
  insertIntoDB,
  getAllCategory,
  getSingleCategory,
  deleteSingleCategory,
  updateSingleCategory,
};
