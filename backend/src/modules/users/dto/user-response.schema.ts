import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { EUserRole } from '../../../common/enums';

export const userResponseSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    email: z.string().email(),
    phone: z.string(),
    role: z.enum([EUserRole.CUSTOMER, EUserRole.VENDOR, EUserRole.ADMIN]),
    is_active: z.boolean(),
    created_at: z.coerce.date(),
  })
  .strip();

export class UserResponseDto extends createZodDto(userResponseSchema) {}

export type UserResponseType = z.infer<typeof userResponseSchema>;
