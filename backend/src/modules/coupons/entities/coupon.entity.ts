import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

@Entity('coupons')
export class CouponEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, type: 'varchar' })
  code!: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
    default: DiscountType.PERCENTAGE,
  })
  discount_type!: DiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discount_value!: number;

  @Column({ type: 'timestamp', nullable: true })
  expires_at!: Date;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @OneToMany(() => OrderEntity, (order) => order.coupon)
  orders!: OrderEntity[];
}
