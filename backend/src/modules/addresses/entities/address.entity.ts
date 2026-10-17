import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  user_id!: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ type: 'varchar' })
  street!: string;

  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ type: 'varchar' })
  zip_code!: string;

  @Column({ type: 'boolean', default: false })
  is_default!: boolean;

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders!: OrderEntity[];

  constructor(partial?: Partial<AddressEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
