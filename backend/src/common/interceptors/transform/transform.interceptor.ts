import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { MSG_KEY } from '../../decorators/message/message.decorator';
import { instanceToPlain } from 'class-transformer';

interface Response<T> {
  data: T;
  msg: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<unknown>
> {
  constructor(private readonly reflector?: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<unknown>> {
    const msg: string =
      this.reflector?.get(MSG_KEY, context.getHandler()) || 'success';

    return next
      .handle()
      .pipe(map((data: T) => ({ data: instanceToPlain(data), msg })));
  }
}
