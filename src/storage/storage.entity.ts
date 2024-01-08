import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Storages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  size_id: string;
  
  @Column()
  size_name: string;

  @Column()
  color_id: string;

  @Column()
  color_name: string;

  @Column()
  quantity: number;

  @Column()
  imported_price_per_product: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
