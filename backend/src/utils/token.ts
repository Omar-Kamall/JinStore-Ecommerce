import { EUserRole } from '../common/enums';
import * as jwt from 'jsonwebtoken';

interface ITokenPayload {
  id?: string;
  email: string;
  role?: EUserRole.CUSTOMER | EUserRole.VENDOR;
}
const secrectKey = process.env.JWT_SECRET || 'secret-key';

export const genrateToken = (payload: ITokenPayload, exp: string): string => {
  return jwt.sign(payload, secrectKey, { expiresIn: exp } as jwt.SignOptions);
};

export const isActiveToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, secrectKey);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
