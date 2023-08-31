import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
const router = express.Router();
router.post('/signup', UserController.insertIntoDB);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
export const UserRouter = router;
