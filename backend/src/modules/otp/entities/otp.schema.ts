import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const otpSchema = z.object({});

export const createOtpSchema = otpSchema;
export const updateOtpSchema = otpSchema.partial();

export class CreateOtpDto extends createZodDto(createOtpSchema) {}
export class UpdateOtpDto extends createZodDto(updateOtpSchema) {}

export type CreateOtpType = z.infer<typeof createOtpSchema>;
export type UpdateOtpType = z.infer<typeof updateOtpSchema>;
