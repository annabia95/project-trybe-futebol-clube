import { IUserPayload } from '../interfaces/payloadInterface';
import Users from '../database/models/users';
import { generateToken } from '../middlewares/jwtValidation';

const userService = async (payload: IUserPayload) => {
  const loginUser = await Users.findOne({ where: { email: payload.email } });

  if (!loginUser) throw new Error('usuário não encontrado');

  const { id, username, role, email } = loginUser;

  const token = await generateToken({ id, username, role, email });

  return {
    token,
  };
};

export default userService;
