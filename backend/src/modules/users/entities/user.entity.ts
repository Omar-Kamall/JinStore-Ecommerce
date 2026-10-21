import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { EUserRole } from '../../../common/enums';
import { AddressEntity } from '../../addresses/entities/address.entity';
import { WishlistEntity } from '../../wishlists/entities/wishlist.entity';
import { ReviewEntity } from '../../reviews/entities/review.entity';
import { CartItemEntity } from '../../cart_items/entities/cart_item.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { ChatRoomEntity } from '../../chat_rooms/entities/chat_room.entity';
import { ChatMessageEntity } from '../../chat_messages/entities/chat_message.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', nullable: true })
  phone!: string | null;

  @Column({ type: 'enum', enum: EUserRole, default: EUserRole.CUSTOMER })
  role!: EUserRole.CUSTOMER | EUserRole.VENDOR | EUserRole.ADMIN;

  @Column({ type: 'boolean', default: false })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses!: AddressEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlists!: WishlistEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews!: ReviewEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
  cart_items!: CartItemEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders!: OrderEntity[];

  @OneToMany(() => ChatRoomEntity, (room) => room.customer)
  customer_chat_rooms!: ChatRoomEntity[];

  @OneToMany(() => ChatRoomEntity, (room) => room.vendor)
  vendor_chat_rooms!: ChatRoomEntity[];

  @OneToMany(() => ChatMessageEntity, (message) => message.sender)
  chat_messages!: ChatMessageEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications!: NotificationEntity[];

  constructor(partial?: Partial<UserEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
