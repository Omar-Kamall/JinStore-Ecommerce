import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const reviewSchema = z.object({
  user_id: z.string().uuid({ message: 'User ID must be a valid UUID' }),

  product_id: z.string().uuid({ message: 'Product ID must be a valid UUID' }),

  rating: z
    .number()
    .int({ message: 'Rating must be an integer' })
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating cannot be more than 5' }),

  comment: z
    .string()
    .max(1000, { message: 'Comment cannot exceed 1000 characters' })
    .nullable()
    .optional(),
});

export const createReviewSchema = reviewSchema;
export const updateReviewSchema = reviewSchema.partial();

export class CreateReviewDto extends createZodDto(createReviewSchema) {
  @ApiProperty({
    description: 'UUID of the reviewing user',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id!: string;

  @ApiProperty({
    description: 'UUID of the reviewed product',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id!: string;

  @ApiProperty({
    description: 'Rating from 1 to 5',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  rating!: number;

  @ApiPropertyOptional({
    description: 'Review comment',
    example: 'Excellent product!',
    nullable: true,
  })
  comment?: string | null;
}

export class UpdateReviewDto extends createZodDto(updateReviewSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the reviewing user',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the reviewed product',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  product_id?: string;

  @ApiPropertyOptional({
    description: 'Rating from 1 to 5',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  rating?: number;

  @ApiPropertyOptional({
    description: 'Review comment',
    example: 'Excellent product!',
    nullable: true,
  })
  comment?: string | null;
}

export type CreateReviewType = z.infer<typeof createReviewSchema>;
export type UpdateReviewType = z.infer<typeof updateReviewSchema>;
