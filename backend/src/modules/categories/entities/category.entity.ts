import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ unique: true, type: 'varchar' })
  slug!: string;

  @Column({ type: 'varchar', nullable: true })
  image_url!: string;

  @Column({ nullable: true })
  parent_id!: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent!: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children!: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
}
