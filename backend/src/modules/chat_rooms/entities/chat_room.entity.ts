import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ChatMessageEntity } from '../../chat_messages/entities/chat_message.entity';

@Entity('chat_rooms')
export class ChatRoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customer_id!: string;

  @ManyToOne(() => UserEntity, (user) => user.customer_chat_rooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: UserEntity;

  @Column()
  vendor_id!: string;

  @ManyToOne(() => UserEntity, (user) => user.vendor_chat_rooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vendor_id' })
  vendor!: UserEntity;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => ChatMessageEntity, (message) => message.room, {
    cascade: true,
  })
  messages!: ChatMessageEntity[];

  constructor(partial?: Partial<ChatRoomEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
