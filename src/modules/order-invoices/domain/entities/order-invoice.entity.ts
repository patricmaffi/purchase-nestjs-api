import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseOrder } from '../../../purchase-order/domain/entities/purchase-order.entity';

@Entity('order_invoice')
export class OrderInvoice {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @Column()
  public serial: string;

  @Column()
  public number: string;

  @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.invoices)
  @JoinColumn({ name: 'purchase_order_id' })
  public purchaseOrder: PurchaseOrder;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'time without time zone',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'time without time zone',
  })
  public updatedAt: Date;
}
