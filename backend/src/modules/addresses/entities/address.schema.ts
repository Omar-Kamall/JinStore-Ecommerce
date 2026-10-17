import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const addressSchema = z.object({
  user_id: z.string().uuid({ message: 'User ID must be a valid UUID' }),
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  zip_code: z.string().min(1, { message: 'ZIP code is required' }),
  is_default: z.boolean().default(false).optional(),
});

export const createAddressSchema = addressSchema;
export const updateAddressSchema = addressSchema.partial();

export class CreateAddressDto extends createZodDto(createAddressSchema) {
  @ApiProperty({
    description: 'UUID of the address owner',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id!: string;

  @ApiProperty({ description: 'Street address', example: '123 Main Street' })
  street!: string;

  @ApiProperty({ description: 'City', example: 'Cairo' })
  city!: string;

  @ApiProperty({ description: 'Country', example: 'Egypt' })
  country!: string;

  @ApiProperty({ description: 'Postal or ZIP code', example: '11511' })
  zip_code!: string;

  @ApiPropertyOptional({
    description: 'Whether this is the default address',
    example: false,
    default: false,
  })
  is_default?: boolean;
}

export class UpdateAddressDto extends createZodDto(updateAddressSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the address owner',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id?: string;

  @ApiPropertyOptional({
    description: 'Street address',
    example: '123 Main Street',
  })
  street?: string;

  @ApiPropertyOptional({ description: 'City', example: 'Cairo' })
  city?: string;

  @ApiPropertyOptional({ description: 'Country', example: 'Egypt' })
  country?: string;

  @ApiPropertyOptional({ description: 'Postal or ZIP code', example: '11511' })
  zip_code?: string;

  @ApiPropertyOptional({
    description: 'Whether this is the default address',
    example: true,
  })
  is_default?: boolean;
}

export type CreateAddressType = z.infer<typeof createAddressSchema>;
export type UpdateAddressType = z.infer<typeof updateAddressSchema>;
