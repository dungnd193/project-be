import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EProductStatus } from './type/product-status.enum';
import { IQuantity } from './type/products.type';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column('jsonb', { nullable: true })
  category: { id: string; name: string };

  @Column('jsonb', { nullable: true })
  quantity: IQuantity[];

  @Column()
  price: number;

  @Column()
  status: EProductStatus;

  @Column()
  brand: string;

  @Column({ nullable: false, type: 'int', default: 0 })
  discount: number;

  @Column()
  viewCount: number;

  @Column('jsonb', { nullable: true })
  nameUrlImage: string[];
}
