import express from 'express';
import { CategoryRouter } from '../modules/Category/category.route';
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
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
