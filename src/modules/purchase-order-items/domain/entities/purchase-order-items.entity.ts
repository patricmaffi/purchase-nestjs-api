import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseOrder } from '../../../purchase-order/domain/entities/purchase-order.entity';
import { Product } from '../../../products/domain/entities/product.entity';

@Entity('purchase_order_item')
export class PurchaseOrderItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'product_code' })
  public productCode: string;

  @Column({ type: 'integer' })
  public quantity: number;

  @Column({
    name: 'unitary_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  public unitaryValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  public discount: number;

  @Column({ name: 'manufacturer_code' })
  public manufacturerCode: string;

  @ManyToOne(
    () => PurchaseOrder,
    (purchaseOrder) => purchaseOrder.purchaseOrderItems,
  )
  @JoinColumn({ name: 'purchase_order_id' })
  public purchaseOrder: PurchaseOrder;

  @OneToOne(() => Product, (product) => product.purchaseOrderItem, {
    nullable: true,
    cascade: true,
  })
  public product: Product;

  @Column({
    name: 'delivery_prevision',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'time without time zone',
  })
  public deliveryPrevision: Date;

  @Column({
    name: 'request_date',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'time without time zone',
  })
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

  public description: string;
}
