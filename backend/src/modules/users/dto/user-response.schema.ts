import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { userSchema } from '../entities/user.schema';

export const userResponseSchema = userSchema
  .omit({
    password: true,
  })
  .extend({
    id: z.string().uuid(),
    created_at: z.coerce.date(),
  })
  .strip();

export class UserResponseDto extends createZodDto(userResponseSchema) {}

export type UserResponseType = z.infer<typeof userResponseSchema>;
