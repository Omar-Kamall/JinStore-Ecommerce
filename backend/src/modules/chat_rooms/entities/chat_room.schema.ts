import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const chatRoomSchema = z.object({
  customer_id: z.string().uuid({ message: 'Customer ID must be a valid UUID' }),
  vendor_id: z.string().uuid({ message: 'Vendor ID must be a valid UUID' }),
});

export const createChatRoomSchema = chatRoomSchema;
export const updateChatRoomSchema = chatRoomSchema.partial();

export class CreateChatRoomDto extends createZodDto(createChatRoomSchema) {
  @ApiProperty({
    description: 'UUID of the customer',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  customer_id!: string;

  @ApiProperty({
    description: 'UUID of the vendor',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  vendor_id!: string;
}

export class UpdateChatRoomDto extends createZodDto(updateChatRoomSchema) {
  @ApiPropertyOptional({
    description: 'UUID of the customer',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  customer_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the vendor',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  vendor_id?: string;
}

export type CreateChatRoomType = z.infer<typeof createChatRoomSchema>;
export type UpdateChatRoomType = z.infer<typeof updateChatRoomSchema>;
