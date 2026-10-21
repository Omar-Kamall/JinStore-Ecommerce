import { Request } from 'express';
import { EUserRole } from '../enums';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: EUserRole;
}

export interface IReqUser extends Request {
  user: IUser;
}
