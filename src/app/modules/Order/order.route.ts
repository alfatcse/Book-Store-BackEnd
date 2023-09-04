import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();
router.post('/create-order', OrderController.insertIntoDB);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);
router.get(
  '/customer-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllOrders
);
export const OrderRouter = router;
