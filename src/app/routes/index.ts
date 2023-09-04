import express from 'express';
import { BookRouter } from '../modules/Book/book.router';
import { CategoryRouter } from '../modules/Category/category.route';
import { OrderRouter } from '../modules/Order/order.route';
import { UserProfileRouter } from '../modules/User/user.ProfileRoute';
import { UserRouter } from '../modules/User/user.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/categories',
    route: CategoryRouter,
  },
  {
    path: '/books',
    route: BookRouter,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
  {
    path: '/profile',
    route: UserProfileRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
