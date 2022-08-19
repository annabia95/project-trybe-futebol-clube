import { Request, Response } from 'express';
import userService from '../services/users.service';

const postUser = async (req: Request, res: Response) => {
  const user = await userService(req.body);

  return res.status(200).json(user);
};

export default postUser;
