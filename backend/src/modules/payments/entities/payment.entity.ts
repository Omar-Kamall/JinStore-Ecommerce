import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';
import { EPaymentMethod, EPaymentStatus } from '../../../common/enums';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  order_id!: string;

  @OneToOne(() => OrderEntity, (order) => order.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity;

  @Column({ type: 'enum', enum: EPaymentMethod })
  method!: EPaymentMethod;

  @Column({
    type: 'enum',
    enum: EPaymentStatus,
    default: EPaymentStatus.PENDING,
  })
  status!: EPaymentStatus;

  @Column({ unique: true, type: 'varchar', nullable: true })
  transaction_id!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'timestamp', nullable: true })
  paid_at!: Date;

  constructor(partial?: Partial<PaymentEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
