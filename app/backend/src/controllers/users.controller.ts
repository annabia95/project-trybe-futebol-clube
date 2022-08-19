import { Request, Response } from 'express';
import userService from '../services/users.service';

export const postUser = async (req: Request, res: Response) => {
  const user = await userService(req.body);

  return res.status(200).json({ token: user });
};

export const getRole = (req: Request, res: Response) => res.status(200).json({
  role: req.body.user.role,
});
