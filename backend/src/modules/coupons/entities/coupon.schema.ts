import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountType } from './coupon.entity';

export const couponSchema = z.object({
  code: z.string().min(1, { message: 'Coupon code is required' }),
  discount_type: z
    .nativeEnum(DiscountType)
    .default(DiscountType.PERCENTAGE)
    .optional(),
  discount_value: z.number().positive({
    message: 'Discount value must be greater than zero',
  }),
  expires_at: z.string().datetime().nullable().optional(),
  is_active: z.boolean().default(true).optional(),
});

export const createCouponSchema = couponSchema;
export const updateCouponSchema = couponSchema.partial();

export class CreateCouponDto extends createZodDto(createCouponSchema) {
  @ApiProperty({ description: 'Unique coupon code', example: 'SUMMER20' })
  code!: string;

  @ApiPropertyOptional({
    description: 'Discount type',
    enum: DiscountType,
    default: DiscountType.PERCENTAGE,
  })
  discount_type?: DiscountType;

  @ApiProperty({ description: 'Discount amount or percentage', example: 20 })
  discount_value!: number;

  @ApiPropertyOptional({
    description: 'Coupon expiration timestamp',
    example: '2026-12-31T23:59:59.000Z',
    nullable: true,
    type: String,
    format: 'date-time',
  })
  expires_at?: string | null;

  @ApiPropertyOptional({
    description: 'Whether the coupon is active',
    example: true,
    default: true,
  })
  is_active?: boolean;
}

export class UpdateCouponDto extends createZodDto(updateCouponSchema) {
  @ApiPropertyOptional({
    description: 'Unique coupon code',
    example: 'SUMMER20',
  })
  code?: string;

  @ApiPropertyOptional({ description: 'Discount type', enum: DiscountType })
  discount_type?: DiscountType;

  @ApiPropertyOptional({
    description: 'Discount amount or percentage',
    example: 20,
  })
  discount_value?: number;

  @ApiPropertyOptional({
    description: 'Coupon expiration timestamp',
    example: '2026-12-31T23:59:59.000Z',
    nullable: true,
    type: String,
    format: 'date-time',
  })
  expires_at?: string | null;

  @ApiPropertyOptional({
    description: 'Whether the coupon is active',
    example: true,
  })
  is_active?: boolean;
}

export type CreateCouponType = z.infer<typeof createCouponSchema>;
export type UpdateCouponType = z.infer<typeof updateCouponSchema>;
