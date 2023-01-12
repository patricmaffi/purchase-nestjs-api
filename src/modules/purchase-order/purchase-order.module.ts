import { Module } from '@nestjs/common';
import { PurchaseOrderController } from './application/controllers/purchase-order.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderInvoice } from '../order-invoices/domain/entities/order-invoice.entity';
import { OrderInvoicesModule } from '../order-invoices/order-invoices.module';
import { Product } from '../products/domain/entities/product.entity';
import { ProductsModule } from '../products/products.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { PurchaseOrder } from './domain/entities/purchase-order.entity';
import { PurchaseOrderItemsModule } from '../purchase-order-items/purchase-order-items.module';
import { PurchaseOrderItem } from '../purchase-order-items/domain/entities/purchase-order-items.entity';
import { PurchaseOrderService } from './domain/services/purchase-order.service';
import { PurchaseOrderFactory } from './domain/factory/purchase-order-factory';
import { PurchaseOrderItemFactory } from '../purchase-order-items/domain/factory/purchase-order-item-factory';
import { PurchaseOrderRepository } from './domain/repository/purchase-order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrder,
      PurchaseOrderItem,
      OrderInvoice,
      Product,
    ]),
    HttpModule,
    Repository,
    ProductsModule,
    SuppliersModule,
    OrderInvoicesModule,
    PurchaseOrderItemsModule,
  ],
  controllers: [PurchaseOrderController],
  providers: [
    PurchaseOrderService,
    PurchaseOrderFactory,
    PurchaseOrderItemFactory,
    PurchaseOrderRepository,
  ],
})
export class PurchaseOrderModule {}
