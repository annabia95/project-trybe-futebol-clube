import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import User from '../database/models/users';

const midLoginRequired = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const loginUser = await User.findOne({ where: { email } });

  if (!loginUser) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (!compareSync(password, loginUser.password)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export default midLoginRequired;
