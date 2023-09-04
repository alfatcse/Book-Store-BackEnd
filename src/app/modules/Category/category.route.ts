import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';
const router = express.Router();
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), CategoryController.getAllCategory);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.getSingleCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteSingleCategory
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateSingleCategory
);
export const CategoryRouter = router;
