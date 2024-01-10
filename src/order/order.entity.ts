import { IOrderItem } from './type/order.type';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  address: string;

  @Column()
  postcode: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  note: string;

  @Column()
  status: string;

  @Column()
  payment_method: string;

  @Column({ type: 'real' })
  discount: string;

  @Column('jsonb', { nullable: true })
  order_list: IOrderItem[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
