import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EOrderStatus } from '../../../common/enums';

export const orderSchema = z.object({
  user_id: z.string().uuid({ message: 'User ID must be a valid UUID' }),
  address_id: z.string().uuid({ message: 'Address ID must be a valid UUID' }),
  coupon_id: z
    .string()
    .uuid({ message: 'Coupon ID must be a valid UUID' })
    .nullable()
    .optional(),
  status: z.nativeEnum(EOrderStatus).default(EOrderStatus.PENDING).optional(),
  subtotal: z.number().nonnegative({ message: 'Subtotal cannot be negative' }),
  discount_amount: z
    .number()
    .nonnegative({ message: 'Discount amount cannot be negative' })
    .default(0)
    .optional(),
  total_amount: z
    .number()
    .nonnegative({ message: 'Total amount cannot be negative' }),
  idempotency_key: z.string().nullable().optional(),
});

export const createOrderSchema = orderSchema;
export const updateOrderSchema = orderSchema.partial();

export class CreateOrderDto extends createZodDto(createOrderSchema) {
  @ApiProperty({
    description: 'UUID of the customer placing the order',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id!: string;

  @ApiProperty({
    description: 'UUID of the shipping address',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  address_id!: string;

  @ApiPropertyOptional({
    description: 'Optional coupon UUID',
    example: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    nullable: true,
  })
  coupon_id?: string | null;

  @ApiPropertyOptional({
    description: 'Current order status',
    enum: EOrderStatus,
    default: EOrderStatus.PENDING,
  })
  status?: EOrderStatus;

  @ApiProperty({ description: 'Order subtotal before discounts', example: 150 })
  subtotal!: number;

  @ApiPropertyOptional({
    description: 'Discount amount applied',
    example: 10,
    default: 0,
  })
  discount_amount?: number;

  @ApiProperty({ description: 'Final order total', example: 140 })
  total_amount!: number;

  @ApiPropertyOptional({
    description: 'Idempotency key for the order request',
    example: 'checkout-session-123',
    nullable: true,
  })
  idempotency_key?: string | null;
}

export class UpdateOrderDto extends createZodDto(updateOrderSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the customer placing the order',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the shipping address',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  address_id?: string;

  @ApiPropertyOptional({
    description: 'Optional coupon UUID',
    example: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    nullable: true,
  })
  coupon_id?: string | null;

  @ApiPropertyOptional({
    description: 'Current order status',
    enum: EOrderStatus,
  })
  status?: EOrderStatus;

  @ApiPropertyOptional({
    description: 'Order subtotal before discounts',
    example: 150,
  })
  subtotal?: number;

  @ApiPropertyOptional({ description: 'Discount amount applied', example: 10 })
  discount_amount?: number;

  @ApiPropertyOptional({ description: 'Final order total', example: 140 })
  total_amount?: number;

  @ApiPropertyOptional({
    description: 'Idempotency key for the order request',
    example: 'checkout-session-123',
    nullable: true,
  })
  idempotency_key?: string | null;
}

export type CreateOrderType = z.infer<typeof createOrderSchema>;
export type UpdateOrderType = z.infer<typeof updateOrderSchema>;
