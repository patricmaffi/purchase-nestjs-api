import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PurchaseOrderItem } from '../entities/purchase-order-items.entity';

@Injectable()
export class PurchaseOrderItemRepository extends Repository<PurchaseOrderItem> {
  constructor(private dataSource: DataSource) {
    super(PurchaseOrderItem, dataSource.createEntityManager());
  }
  async lastPurchaseByProduct(
    productCode: string,
  ): Promise<PurchaseOrderItem | undefined> {
    const item = await this.findOne({
      select: {
        id: true,
        productCode: true,
        unitaryValue: true,
      },
      relations: {
        purchaseOrder: true,
      },
      where: {
        productCode: productCode,
        purchaseOrder: {
          status: 'confirmed',
        },
      },
      order: {
        purchaseOrder: {
          requestDate: 'ASC',
        },
      },
    });
    return item;
  }
}
