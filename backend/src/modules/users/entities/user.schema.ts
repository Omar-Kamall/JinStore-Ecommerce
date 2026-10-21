import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EUserRole } from '../../../common/enums';

export const userSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' })
      .nullable()
      .optional(),

    email: z.string().email({ message: 'Invalid email address' }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),

    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' })
      .nullable()
      .optional(),

    role: z
      .enum([EUserRole.CUSTOMER, EUserRole.VENDOR, EUserRole.ADMIN])
      .default(EUserRole.CUSTOMER)
      .optional(),
  })
  .strict();

export const createUserSchema = userSchema;
export const updateUserSchema = userSchema.partial();

export class CreateUserDto extends createZodDto(createUserSchema) {
  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'Omar Kamal',
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    description: 'Unique email address',
    example: 'omar@jinstore.com',
  })
  email!: string;

  @ApiProperty({ description: 'User password', example: 'StrongP@ssw0rd!' })
  password!: string;

  @ApiPropertyOptional({
    description: 'Phone number in international format',
    example: '+201000000000',
    nullable: true,
  })
  phone?: string | null;

  @ApiPropertyOptional({
    description: 'User role',
    enum: EUserRole,
    default: EUserRole.CUSTOMER,
  })
  role?: EUserRole.CUSTOMER | EUserRole.VENDOR | EUserRole.ADMIN;
}

export class UpdateUserDto extends createZodDto(updateUserSchema) {
  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'Omar Kamal',
    nullable: true,
  })
  name?: string | null;

  @ApiPropertyOptional({
    description: 'Unique email address',
    example: 'omar@jinstore.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'User password',
    example: 'StrongP@ssw0rd!',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Phone number in international format',
    example: '+201000000000',
    nullable: true,
  })
  phone?: string | null;
}

export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
