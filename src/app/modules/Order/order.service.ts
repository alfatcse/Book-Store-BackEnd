import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Order): Promise<Order> => {
  const { userId, orderedBooks } = data;
  const order = await prisma.order.create({
    data: {
      userId,
      orderedBooks: {
        createMany: {
          data: orderedBooks.map(({ bookId, quantity }) => ({
            bookId,
            quantity,
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
export const OrderService = { insertIntoDB };
