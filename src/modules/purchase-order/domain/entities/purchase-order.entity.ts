import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderInvoice } from '../../../order-invoices/domain/entities/order-invoice.entity';
import { PurchaseOrderItem } from '../../../purchase-order-items/domain/entities/purchase-order-items.entity';

@Entity('purchase_order')
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'order_code' })
  public orderCode: string;

  @Column({ name: 'supplier_code' })
  public supplierCode: string;

  @Column({ name: 'supplier_name' })
  public supplierName: string;

  @Column({ name: 'manufacturer_code' })
  public manufacturerCode: string;

  @Column({
    name: 'shipping_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  public shippingValue: number;

  @Column({
    name: 'total_order_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  public totalOrderValue: number;

  @Column({ name: 'payment_terms' })
  public paymentTerms: string;

  @Column()
  public observation: string;

  @Column()
  public status: string;

  @OneToMany(
    () => PurchaseOrderItem,
    (purchaseOrderItem) => purchaseOrderItem.purchaseOrder,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'purchase_order_item' })
  public purchaseOrderItems: PurchaseOrderItem[];

  @OneToMany(() => OrderInvoice, (orderInvoice) => orderInvoice.purchaseOrder, {
    cascade: true,
  })
  public invoices: OrderInvoice[];

  @Column({ name: 'delivery_prevision', type: 'timestamp' })
  public deliveryPrevision: Date;

  @Column({ name: 'request_date', type: 'timestamp' })
  public requestDate: Date;

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
