import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ENotificationType } from '../../../common/enums';

export const notificationSchema = z.object({
  user_id: z.string().uuid({ message: 'User ID must be a valid UUID' }),
  title: z.string().min(1, { message: 'Title is required' }),
  body: z.string().min(1, { message: 'Body is required' }),
  type: z.nativeEnum(ENotificationType),
  is_read: z.boolean().default(false).optional(),
});

export const createNotificationSchema = notificationSchema;
export const updateNotificationSchema = notificationSchema.partial();

export class CreateNotificationDto extends createZodDto(
  createNotificationSchema,
) {
  @ApiProperty({
    description: 'UUID of the notification recipient',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id!: string;

  @ApiProperty({ description: 'Notification title', example: 'Order shipped' })
  title!: string;

  @ApiProperty({
    description: 'Notification body',
    example: 'Your order is on its way.',
  })
  body!: string;

  @ApiProperty({
    description: 'Notification category',
    enum: ENotificationType,
    example: ENotificationType.ORDER_STATUS,
  })
  type!: ENotificationType;

  @ApiPropertyOptional({
    description: 'Whether the notification has been read',
    example: false,
    default: false,
  })
  is_read?: boolean;
}

export class UpdateNotificationDto extends createZodDto(
  updateNotificationSchema,
) {
  @ApiPropertyOptional({
    description: 'UUID of the notification recipient',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  user_id?: string;

  @ApiPropertyOptional({
    description: 'Notification title',
    example: 'Order shipped',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Notification body',
    example: 'Your order is on its way.',
  })
  body?: string;

  @ApiPropertyOptional({
    description: 'Notification category',
    enum: ENotificationType,
  })
  type?: ENotificationType;

  @ApiPropertyOptional({
    description: 'Whether the notification has been read',
    example: true,
  })
  is_read?: boolean;
}

export type CreateNotificationType = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationType = z.infer<typeof updateNotificationSchema>;
