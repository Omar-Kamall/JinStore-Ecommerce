import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const productSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long' }),

  slug: z
    .string()
    .min(2, { message: 'Slug must be at least 2 characters long' }),

  description: z.string().nullable().optional(),

  price: z.number().positive({ message: 'Price must be a positive number' }),

  stock: z
    .number()
    .int({ message: 'Stock must be an integer' })
    .nonnegative({ message: 'Stock cannot be negative' })
    .default(0)
    .optional(),

  main_image_url: z
    .string()
    .url({ message: 'Invalid URL format' })
    .nullable()
    .optional(),

  image_urls: z
    .array(z.string().url({ message: 'Invalid URL format' }))
    .nullable()
    .optional(),

  category_id: z
    .string()
    .uuid({ message: 'Category ID must be a valid UUID' })
    .nullable()
    .optional(),

  is_active: z.boolean().default(true).optional(),
});

export const createProductSchema = productSchema;
export const updateProductSchema = productSchema.partial();

export class CreateProductDto extends createZodDto(createProductSchema) {
  @ApiProperty({
    description: 'Product title',
    example: 'Wireless Gaming Mouse',
  })
  title!: string;

  @ApiProperty({
    description: 'SEO-friendly product slug',
    example: 'wireless-gaming-mouse',
  })
  slug!: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'High performance wireless mouse.',
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({ description: 'Product price', example: 49.99, minimum: 0 })
  price!: number;

  @ApiPropertyOptional({
    description: 'Available stock quantity',
    example: 50,
    default: 0,
  })
  stock?: number;

  @ApiPropertyOptional({
    description: 'Main product image URL',
    example: 'https://example.com/images/mouse.jpg',
    nullable: true,
  })
  main_image_url?: string | null;

  @ApiPropertyOptional({
    description: 'Product gallery image URLs',
    example: ['https://example.com/images/mouse-1.jpg'],
    nullable: true,
    type: [String],
  })
  image_urls?: string[] | null;

  @ApiPropertyOptional({
    description: 'UUID of the product category',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    nullable: true,
  })
  category_id?: string | null;

  @ApiPropertyOptional({
    description: 'Whether the product is active',
    example: true,
    default: true,
  })
  is_active?: boolean;
}

export class UpdateProductDto extends createZodDto(updateProductSchema) {
  @ApiPropertyOptional({
    description: 'Product title',
    example: 'Wireless Gaming Mouse',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'SEO-friendly product slug',
    example: 'wireless-gaming-mouse',
  })
  slug?: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'High performance wireless mouse.',
    nullable: true,
  })
  description?: string | null;

  @ApiPropertyOptional({
    description: 'Product price',
    example: 49.99,
    minimum: 0,
  })
  price?: number;

  @ApiPropertyOptional({ description: 'Available stock quantity', example: 50 })
  stock?: number;

  @ApiPropertyOptional({
    description: 'Main product image URL',
    example: 'https://example.com/images/mouse.jpg',
    nullable: true,
  })
  main_image_url?: string | null;

  @ApiPropertyOptional({
    description: 'Product gallery image URLs',
    example: ['https://example.com/images/mouse-1.jpg'],
    nullable: true,
    type: [String],
  })
  image_urls?: string[] | null;

  @ApiPropertyOptional({
    description: 'UUID of the product category',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    nullable: true,
  })
  category_id?: string | null;

  @ApiPropertyOptional({
    description: 'Whether the product is active',
    example: true,
  })
  is_active?: boolean;
}

export type CreateProductType = z.infer<typeof createProductSchema>;
export type UpdateProductType = z.infer<typeof updateProductSchema>;
