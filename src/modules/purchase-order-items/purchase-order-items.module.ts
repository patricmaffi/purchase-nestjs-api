import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderItem } from './domain/entities/purchase-order-items.entity';
import { PurchaseOrderItemsController } from './application/controllers/purchase-order-items.controller';
import { PurchaseOrderItemsService } from './domain/services/purchase-order-items.service';
import { PurchaseOrderItemFactory } from './domain/factory/purchase-order-item-factory';
import { PurchaseOrderItemRepository } from './domain/repository/purchase-order-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderItem]), Repository],
  controllers: [PurchaseOrderItemsController],
  providers: [
    PurchaseOrderItemsService,
    PurchaseOrderItemFactory,
    PurchaseOrderItemRepository,
  ],
  exports: [
    PurchaseOrderItemsService,
    PurchaseOrderItemFactory,
    PurchaseOrderItemRepository,
  ],
})
export class PurchaseOrderItemsModule {}
