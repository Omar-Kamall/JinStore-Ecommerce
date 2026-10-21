import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IReqUser } from '../../interfaces';
import { AppError } from '../../errors/app.error';
import { EUserRole } from '../../enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<EUserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const req = context.switchToHttp().getRequest<IReqUser>();
    const user = req.user;

    const hasRole = roles.some((role) => user?.role?.includes(role));

    if (!hasRole) {
      throw new AppError(
        'Forbidden: You do not have permission',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
