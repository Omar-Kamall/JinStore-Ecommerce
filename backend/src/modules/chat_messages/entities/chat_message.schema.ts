import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const chatMessageSchema = z.object({
  room_id: z.string().uuid({ message: 'Room ID must be a valid UUID' }),
  sender_id: z.string().uuid({ message: 'Sender ID must be a valid UUID' }),
  message: z.string().min(1, { message: 'Message is required' }),
  is_read: z.boolean().default(false).optional(),
});

export const createChatMessageSchema = chatMessageSchema;
export const updateChatMessageSchema = chatMessageSchema.partial();

export class CreateChatMessageDto extends createZodDto(
  createChatMessageSchema,
) {
  @ApiProperty({
    description: 'UUID of the chat room',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  room_id!: string;

  @ApiProperty({
    description: 'UUID of the message sender',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  sender_id!: string;

  @ApiProperty({
    description: 'Message body',
    example: 'Hello, how can I help you?',
  })
  message!: string;

  @ApiPropertyOptional({
    description: 'Whether the message has been read',
    example: false,
    default: false,
  })
  is_read?: boolean;
}

export class UpdateChatMessageDto extends createZodDto(
  updateChatMessageSchema,
) {
  @ApiPropertyOptional({
    description: 'UUID of the chat room',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  room_id?: string;

  @ApiPropertyOptional({
    description: 'UUID of the message sender',
    example: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3f2e1d0c',
  })
  sender_id?: string;

  @ApiPropertyOptional({
    description: 'Message body',
    example: 'Hello, how can I help you?',
  })
  message?: string;

  @ApiPropertyOptional({
    description: 'Whether the message has been read',
    example: true,
  })
  is_read?: boolean;
}

export type CreateChatMessageType = z.infer<typeof createChatMessageSchema>;
export type UpdateChatMessageType = z.infer<typeof updateChatMessageSchema>;
