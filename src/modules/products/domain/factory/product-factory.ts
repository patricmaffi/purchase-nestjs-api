import { PurchaseOrderItem } from './../../../purchase-order-items/domain/entities/purchase-order-items.entity';
import { Product } from './../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../../../purchase-order/domain/entities/purchase-order.entity';

@Injectable()
export class ProductsPurchaseFactory {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderItem)
    private purchaseOrderItemRepository: Repository<PurchaseOrderItem>,
  ) {}

  build(model: any) {
    return this.productRepository.create({
      productCode: model.codigo_produto,
      name: model.nome_produto,
      description: model.descricao || '',
      supplierCode: model.codigo_fornecedor,
      purchaseOrderItem: model.purchaseOrderItem || 0,
    });
  }

  buildManyPurchaseOrderSuppliers(model: any[]): any[] {
    return model.map(
      async (item) => await this.buildPurchaseOrderSuppliers(item),
    );
  }

  async buildPurchaseOrderSuppliers(model: any): Promise<any> {
    delete model.produto.id;
    const orders = await this.purchaseOrderRepository.find({
      relations: {
        purchaseOrderItems: true,
      },
      where: {
        purchaseOrderItems: {
          productCode: model.produto.codigo,
        },
      },
    });
    if (orders.length) {
      model.produto['pedidos'] = orders.map((order) => {
        order['prdRef'] = model.produto.codigo;
        return order;
      });
    }
    return model;
  }

  async buildManyNewProducts(model: any[]): Promise<Product[]> {
    const newProducts: Product[] = [];
    for (let i = 0; i < model.length; i++)
      if (model[i].newProduct != null) {
        newProducts.push(await this.buildNewProducts(model[i].newProduct));
      }
    return newProducts;
  }

  async buildNewProducts(model: any): Promise<Product> {
    const orderItem: any = await this.purchaseOrderItemRepository
      .createQueryBuilder('PurchaseOrderItem')
      .where('PurchaseOrderItem.productCode = :productCode', {
        productCode: model.codigo_produto,
      })
      .getOne();
    model.purchaseOrderItem = orderItem.id;
    return this.build(model);
  }

  async buildMany(model: any[]): Promise<any[]> {
    return model.map((item) => this.build(item));
  }
}
