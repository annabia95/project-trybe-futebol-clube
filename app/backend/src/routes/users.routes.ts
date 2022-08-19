import { Router } from 'express';
import { validateToken } from '../middlewares/jwtValidation';
import { postUser, getRole } from '../controllers/users.controller';
import midLoginRequired from '../middlewares/userValidation';

const userRoutes = Router();

userRoutes.post('/', midLoginRequired, postUser);
userRoutes.get('/validate', validateToken, getRole);

export default userRoutes;
