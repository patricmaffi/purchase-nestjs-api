import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from '../../../../shared/domain/factory';
import { PurchaseOrder } from '../../../purchase-order/domain/entities/purchase-order.entity';
import { PurchaseOrderItem } from '../entities/purchase-order-items.entity';

@Injectable()
export class PurchaseOrderItemFactory
  implements Factory<any, PurchaseOrderItem>
{
  constructor(
    @InjectRepository(PurchaseOrderItem)
    private repository: Repository<PurchaseOrderItem>,
  ) {}

  build(model: any): PurchaseOrderItem {
    return this.repository.create({
      id: model.id || null,
      productCode: model.codigo_produto,
      quantity: model.quantidade,
      unitaryValue: model.valor_unitario,
      discount: model.desconto || 0,
      manufacturerCode: model.manufacturerCode || '',
    });
  }

  public buildWithOrder(model: any, order: PurchaseOrder): PurchaseOrderItem {
    const orderItem = this.build(model);
    orderItem.purchaseOrder = order;
    return orderItem;
  }

  buildMany(model: any[]): PurchaseOrderItem[] {
    return model.map((el) => this.build(el));
  }

  async buildManyWithOrder(
    model: any[],
    order: PurchaseOrder,
  ): Promise<PurchaseOrderItem[]> {
    return model.map((el) => this.buildWithOrder(el, order));
  }
}
