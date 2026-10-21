import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppError } from '../../errors/app.error';
import { decodeToken, isActiveToken } from '../../../utils/token';
import { IReqUser, IUser } from '../../interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: IReqUser = context.switchToHttp().getRequest();
    const cookies = req.cookies as Record<string, string> | undefined;
    const token = (cookies?.['token'] ||
      cookies?.['verify-account-token'] ||
      cookies?.['forget-password-token']) as string;
    if (!token)
      throw new AppError(
        'Unauthorized: Token is missing',
        HttpStatus.UNAUTHORIZED,
      );

    try {
      const verifyToken = isActiveToken(token);
      if (!verifyToken)
        throw new AppError(
          'Unauthorized: Invalid or expired token',
          HttpStatus.UNAUTHORIZED,
        );

      const decodedToken = decodeToken(token) as IUser;
      req.user = decodedToken;

      return true;
    } catch (error) {
      throw new AppError(
        'Unauthorized: Invalid or expired token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
