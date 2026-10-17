import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const wishlistSchema = z.object({
  user_id: z.string().uuid({ message: 'User ID must be a valid UUID' }),

  product_id: z.string().uuid({ message: 'Product ID must be a valid UUID' }),
});

export const createWishlistSchema = wishlistSchema;
export const updateWishlistSchema = wishlistSchema.partial();

export class CreateWishlistDto extends createZodDto(createWishlistSchema) {
  @ApiProperty({
    description: 'UUID of the wishlist owner',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id!: string;

  @ApiProperty({
    description: 'UUID of the product added to the wishlist',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id!: string;
}

export class UpdateWishlistDto extends createZodDto(updateWishlistSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the wishlist owner',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the product added to the wishlist',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id?: string;
}

export type CreateWishlistType = z.infer<typeof createWishlistSchema>;
export type UpdateWishlistType = z.infer<typeof updateWishlistSchema>;
