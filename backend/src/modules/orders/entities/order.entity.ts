import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { AddressEntity } from '../../addresses/entities/address.entity';
import { CouponEntity } from '../../coupons/entities/coupon.entity';
import { OrderItemEntity } from '../../order_items/entities/order_item.entity';
import { PaymentEntity } from '../../payments/entities/payment.entity';
import { EOrderStatus } from '../../../common/enum';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  user_id!: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column()
  address_id!: string;

  @ManyToOne(() => AddressEntity, (address) => address.orders, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'address_id' })
  address!: AddressEntity;

  @Column({ nullable: true })
  coupon_id!: string;

  @ManyToOne(() => CouponEntity, (coupon) => coupon.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'coupon_id' })
  coupon!: CouponEntity;

  @Column({ type: 'enum', enum: EOrderStatus, default: EOrderStatus.PENDING })
  status!: EOrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount_amount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount!: number;

  @Column({ unique: true, type: 'varchar', nullable: true })
  idempotency_key!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items!: OrderItemEntity[];

  @OneToOne(() => PaymentEntity, (payment) => payment.order)
  payment!: PaymentEntity;
}
