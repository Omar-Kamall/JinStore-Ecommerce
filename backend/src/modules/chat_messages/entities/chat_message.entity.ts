import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ChatRoomEntity } from '../../chat_rooms/entities/chat_room.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('chat_messages')
export class ChatMessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  room_id!: string;

  @ManyToOne(() => ChatRoomEntity, (room) => room.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  room!: ChatRoomEntity;

  @Column()
  sender_id!: string;

  @ManyToOne(() => UserEntity, (user) => user.chat_messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sender_id' })
  sender!: UserEntity;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'boolean', default: false })
  is_read!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  constructor(partial?: Partial<ChatMessageEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
