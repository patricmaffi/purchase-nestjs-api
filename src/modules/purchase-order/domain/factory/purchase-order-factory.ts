import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from '../../../../shared/domain/factory';
import { PurchaseOrder } from '../entities/purchase-order.entity';

@Injectable()
export class PurchaseOrderFactory implements Factory<any, PurchaseOrder> {
  constructor(
    @InjectRepository(PurchaseOrder)
    private repository: Repository<PurchaseOrder>,
  ) {}

  build(model: any): PurchaseOrder {
    return this.repository.create({
      id: model.id || null,
      orderCode: model.codigo_pedido,
      paymentTerms: model.condicao_pagamento,
      requestDate: new Date(model.data_pedido),
      deliveryPrevision: new Date(model.previsao_entrega),
      observation: model.observacao,
      supplierCode: model.codigo_fornecedor,
      supplierName: model.supplierName || 'x',
      status: model.status,
      totalOrderValue: model.total_pedido,
      shippingValue: model.valor_frete,
      manufacturerCode: 'TEMP',
    });
  }

  buildMany(model: any[]): PurchaseOrder[] {
    return model.map((el) => this.build(el));
  }
}
