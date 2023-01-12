import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseOrderItem } from '../../../purchase-order-items/domain/entities/purchase-order-items.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'product_code' })
  public productCode: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ name: 'supplier_code' })
  public supplierCode: string;

  @OneToOne(
    () => PurchaseOrderItem,
    (purchaseOrderItem) => purchaseOrderItem.product,
  )
  @JoinColumn({ name: 'purchase_order_item_id' })
  public purchaseOrderItem: PurchaseOrderItem;

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
