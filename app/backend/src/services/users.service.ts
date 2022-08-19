import Users from '../database/models/users';
import { generateToken } from '../middlewares/jwtValidation';
import { IUserPayload } from '../interfaces/payloadInterface';

const userService = async (payload: IUserPayload) => {
  const loginUser = await Users.findOne({ where: { email: payload.email } });
  if (!loginUser) return null;
  const { id, username, email, role } = loginUser;

  const token = await generateToken({ id, username, email, role });

  return token;
};

export default userService;
