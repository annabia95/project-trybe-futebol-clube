import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/userInterface';

const secret = process.env.JWT_TOKEN || 'jwt_secret';

const generateToken = async (payload: IUser) => {
  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
  return token;
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decode = jwt.verify(token, secret) as jwt.JwtPayload;

    req.body.user = decode;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export {
  generateToken,
  validateToken,
};
