import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const categorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  image_url: z
    .string()
    .url({ message: 'Invalid URL format' })
    .nullable()
    .optional(),
  parent_id: z
    .string()
    .uuid({ message: 'Parent category ID must be a valid UUID' })
    .nullable()
    .optional(),
});

export const createCategorySchema = categorySchema;
export const updateCategorySchema = categorySchema.partial();

export class CreateCategoryDto extends createZodDto(createCategorySchema) {
  @ApiProperty({ description: 'Category name', example: 'Electronics' })
  name!: string;

  @ApiProperty({
    description: 'URL-friendly category slug',
    example: 'electronics',
  })
  slug!: string;

  @ApiPropertyOptional({
    description: 'Category image URL',
    example: 'https://example.com/electronics.jpg',
    nullable: true,
  })
  image_url?: string | null;

  @ApiPropertyOptional({
    description: 'UUID of the parent category',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    nullable: true,
  })
  parent_id?: string | null;
}

export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {
  @ApiPropertyOptional({ description: 'Category name', example: 'Electronics' })
  name?: string;

  @ApiPropertyOptional({
    description: 'URL-friendly category slug',
    example: 'electronics',
  })
  slug?: string;

  @ApiPropertyOptional({
    description: 'Category image URL',
    example: 'https://example.com/electronics.jpg',
    nullable: true,
  })
  image_url?: string | null;

  @ApiPropertyOptional({
    description: 'UUID of the parent category',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    nullable: true,
  })
  parent_id?: string | null;
}

export type CreateCategoryType = z.infer<typeof createCategorySchema>;
export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
