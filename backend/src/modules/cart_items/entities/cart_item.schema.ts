import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const cartItemSchema = z.object({
  user_id: z.string().uuid({ message: 'User ID must be a valid UUID' }),
  product_id: z.string().uuid({ message: 'Product ID must be a valid UUID' }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .positive({ message: 'Quantity must be greater than zero' })
    .default(1)
    .optional(),
});

export const createCartItemSchema = cartItemSchema;
export const updateCartItemSchema = cartItemSchema.partial();

export class CreateCartItemDto extends createZodDto(createCartItemSchema) {
  @ApiProperty({
    description: 'UUID of the cart owner',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id!: string;

  @ApiProperty({
    description: 'UUID of the product',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id!: string;

  @ApiPropertyOptional({
    description: 'Quantity of the product',
    example: 2,
    default: 1,
  })
  quantity?: number;
}

export class UpdateCartItemDto extends createZodDto(updateCartItemSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the cart owner',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the product',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id?: string;

  @ApiPropertyOptional({ description: 'Quantity of the product', example: 3 })
  quantity?: number;
}

export type CreateCartItemType = z.infer<typeof createCartItemSchema>;
export type UpdateCartItemType = z.infer<typeof updateCartItemSchema>;
