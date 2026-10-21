import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from '../../../common/enums';

export const createAuthSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters'),

    email: z
      .string()
      .trim()
      .email('Invalid email address')
      .max(254, 'Email is too long'),

    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must not exceed 128 characters'),

    role: z.nativeEnum(EUserRole),
  })
  .strict();

export const loginAuthSchema = z
  .object({
    email: z.string().trim().email('Invalid email address'),
    password: z.string().trim().min(1, 'Password is required'),
  })
  .strict();

export const forgetPasswordSchema = z
  .object({
    email: z.string().trim().email('Invalid email address'),
  })
  .strict();

export const verifyAccountSchema = z
  .object({
    email: z.string().trim().email('Invalid email address'),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    password: z.string().trim().min(8, 'Password is required'),
  })
  .strict();

export const verifyOtpSchema = z
  .object({
    code: z.string().trim().max(6).min(6),
  })
  .strict();

export const updateAuthSchema = createAuthSchema.omit({ role: true }).partial();

export class CreateAuthDto extends createZodDto(createAuthSchema) {
  @ApiProperty({ example: 'Omar Kamal', minLength: 2, maxLength: 100 })
  name!: string;

  @ApiProperty({ example: 'omar@jinstore.com' })
  email!: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!', minLength: 8, maxLength: 128 })
  password!: string;

  @ApiProperty({ enum: EUserRole })
  role!: EUserRole.CUSTOMER | EUserRole.VENDOR;
}

export class LoginAuthDto extends createZodDto(loginAuthSchema) {
  @ApiProperty({ example: 'omar@jinstore.com' })
  email!: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  password!: string;
}

export class ForgotPasswordDto extends createZodDto(forgetPasswordSchema) {
  @ApiProperty({ example: 'example@example.com' })
  email!: string;
}

export class VerifyAccountDto extends createZodDto(verifyAccountSchema) {
  @ApiProperty({ example: 'example@example.com' })
  email!: string;
}

export class VerifyOtpDto extends createZodDto(verifyOtpSchema) {
  @ApiProperty({
    example: '123456',
    description: 'Six-digit OTP sent to the email',
    minLength: 6,
    maxLength: 6,
  })
  code!: string;
}

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {
  @ApiProperty({
    example: 'NewStrongP@ssw0rd!',
    description: 'New password',
    minLength: 8,
    maxLength: 15,
  })
  password!: string;
}

export type CreateAuthType = z.infer<typeof createAuthSchema>;
export type LoginAuthType = z.infer<typeof loginAuthSchema>;
export type ForgotPasswordType = z.infer<typeof forgetPasswordSchema>;
export type VerifyAccountType = z.infer<typeof verifyAccountSchema>;
export type VerifyOtpType = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
