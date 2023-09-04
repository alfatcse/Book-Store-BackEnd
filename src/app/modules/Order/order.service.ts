import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: any): Promise<Order> => {
  const { userId, orderedBooks } = data;
  const order = await prisma.order.create({
    data: {
      userId,
      orderedBooks: {
        createMany: {
          data: orderedBooks.map((orBook: { bookId: any; quantity: any }) => ({
            bookId: orBook.bookId,
            quantity: orBook.quantity,
          })),
        },
      },
    },
    include: {
      orderedBooks: true,
    },
  });
  return order;
};
const getAllOrders = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return result;
};
const getAllOrdersOfCustomers = async (
  id: string
): Promise<Partial<Order> | null> => {
  const result = await prisma.order.findFirst({
    where: {
      userId: id,
    },
  });
  return result;
};
export const OrderService = {
  insertIntoDB,
  getAllOrders,
  getAllOrdersOfCustomers,
};
