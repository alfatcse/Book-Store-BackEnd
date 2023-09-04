export type IOrder = {
  userId: string;
  status: string;
  orderedBooks: OrderedBook[];
};
type OrderedBook = {
  bookId: string;
  quantity: number;
  orderId: string;
};
