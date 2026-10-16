import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { WishlistEntity } from '../../wishlists/entities/wishlist.entity';
import { CartItemEntity } from '../../cart_items/entities/cart_item.entity';
import { ReviewEntity } from '../../reviews/entities/review.entity';
import { OrderItemEntity } from '../../order_items/entities/order_item.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ unique: true, type: 'varchar' })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ type: 'varchar', nullable: true })
  main_image_url!: string;

  @Column({ type: 'simple-array', nullable: true })
  image_urls!: string[];

  @Column({ nullable: true })
  category_id!: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.product)
  wishlists!: WishlistEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cart_items!: CartItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews!: ReviewEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  order_items!: OrderItemEntity[];
}
