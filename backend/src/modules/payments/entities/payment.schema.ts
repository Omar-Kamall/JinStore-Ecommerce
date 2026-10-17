import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EPaymentMethod, EPaymentStatus } from '../../../common/enums';

export const paymentSchema = z.object({
  order_id: z.string().uuid({ message: 'Order ID must be a valid UUID' }),

  method: z.nativeEnum(EPaymentMethod, {
    error: 'Invalid payment method',
  }),

  status: z
    .nativeEnum(EPaymentStatus)
    .default(EPaymentStatus.PENDING)
    .optional(),

  transaction_id: z.string().nullable().optional(),

  amount: z.number().positive({ message: 'Amount must be a positive number' }),

  paid_at: z
    .string()
    .datetime()
    .transform((value) => new Date(value))
    .nullable()
    .optional(),
});

export const createPaymentSchema = paymentSchema;
export const updatePaymentSchema = paymentSchema.partial();

export class CreatePaymentDto extends createZodDto(createPaymentSchema) {
  @ApiProperty({
    description: 'UUID of the associated order',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  order_id!: string;

  @ApiProperty({
    description: 'Payment method',
    enum: EPaymentMethod,
    example: EPaymentMethod.PYMOBILE,
  })
  method!: EPaymentMethod;

  @ApiPropertyOptional({
    description: 'Payment status',
    enum: EPaymentStatus,
    default: EPaymentStatus.PENDING,
  })
  status?: EPaymentStatus;

  @ApiPropertyOptional({
    description: 'External transaction ID',
    example: 'tx_123456789',
    nullable: true,
  })
  transaction_id?: string | null;

  @ApiProperty({ description: 'Payment amount', example: 150 })
  amount!: number;

  @ApiPropertyOptional({
    description: 'Payment completion timestamp',
    example: '2026-10-16T18:00:00.000Z',
    nullable: true,
    type: String,
    format: 'date-time',
  })
  paid_at?: Date | null;
}

export class UpdatePaymentDto extends createZodDto(updatePaymentSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the associated order',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  order_id?: string;

  @ApiPropertyOptional({ description: 'Payment method', enum: EPaymentMethod })
  method?: EPaymentMethod;

  @ApiPropertyOptional({ description: 'Payment status', enum: EPaymentStatus })
  status?: EPaymentStatus;

  @ApiPropertyOptional({
    description: 'External transaction ID',
    example: 'tx_123456789',
    nullable: true,
  })
  transaction_id?: string | null;

  @ApiPropertyOptional({ description: 'Payment amount', example: 150 })
  amount?: number;

  @ApiPropertyOptional({
    description: 'Payment completion timestamp',
    example: '2026-10-16T18:00:00.000Z',
    nullable: true,
    type: String,
    format: 'date-time',
  })
  paid_at?: Date | null;
}

export type CreatePaymentType = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentType = z.infer<typeof updatePaymentSchema>;
