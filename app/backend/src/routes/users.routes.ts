import { Router } from 'express';
import postUser from '../controllers/users.controller';
import midLoginRequired from '../middlewares/userValidation';

const userRoutes = Router();

userRoutes.post('/', midLoginRequired, postUser);

export default userRoutes;
