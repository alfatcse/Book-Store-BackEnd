import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();
router.post('/create-order', OrderController.insertIntoDB);

export const OrderRouter = router;
