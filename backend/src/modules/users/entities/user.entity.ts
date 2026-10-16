import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { EUserRole } from '../../../common/enum';
import { NotificationEntity } from '../../notifications/entities/notification.entity';
import { ChatMessageEntity } from '../../chat_messages/entities/chat_message.entity';
import { ChatRoomEntity } from '../../chat_rooms/entities/chat_room.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { ReviewEntity } from '../../reviews/entities/review.entity';
import { CartItemEntity } from '../../cart_items/entities/cart_item.entity';
import { WishlistEntity } from '../../wishlists/entities/wishlist.entity';
import { AddressEntity } from '../../addresses/entities/address.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string;

  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', nullable: true })
  phone!: string;

  @Column({ type: 'enum', enum: EUserRole, default: EUserRole.CUSTOMER })
  role!: EUserRole;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses!: AddressEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlists!: WishlistEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
  cart_items!: CartItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews!: ReviewEntity[];

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
}
