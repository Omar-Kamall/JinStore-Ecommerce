import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const orderItemSchema = z.object({
  order_id: z.string().uuid({ message: 'Order ID must be a valid UUID' }),
  product_id: z.string().uuid({ message: 'Product ID must be a valid UUID' }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .positive({ message: 'Quantity must be greater than zero' }),
});

export const createOrderItemSchema = orderItemSchema;
export const updateOrderItemSchema = orderItemSchema.partial();

export class CreateOrderItemDto extends createZodDto(createOrderItemSchema) {
  @ApiProperty({
    description: 'UUID of the order',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  order_id!: string;

  @ApiProperty({
    description: 'UUID of the product',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id!: string;

  @ApiProperty({
    description: 'Quantity of the product in the order',
    example: 2,
    minimum: 1,
  })
  quantity!: number;
}

export class UpdateOrderItemDto extends createZodDto(updateOrderItemSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the order',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  order_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the product',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id?: string;

  @ApiPropertyOptional({
    description: 'Quantity of the product in the order',
    example: 2,
    minimum: 1,
  })
  quantity?: number;
}

export type CreateOrderItemType = z.infer<typeof createOrderItemSchema>;
export type UpdateOrderItemType = z.infer<typeof updateOrderItemSchema>;
