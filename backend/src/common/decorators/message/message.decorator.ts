import { SetMetadata } from '@nestjs/common';

export const MSG_KEY = 'msg';
export const Message = (msg: string) => SetMetadata(MSG_KEY, msg);
