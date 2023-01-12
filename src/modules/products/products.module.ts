import { PurchaseOrderItem } from './../purchase-order-items/domain/entities/purchase-order-items.entity';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './domain/services/products.service';
import { ProductsController } from './application/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../purchase-order/domain/entities/purchase-order.entity';
import { ProductsPurchaseFactory } from './domain/factory/product-factory';
import { ProductsBlingSearch } from '../../shared/bling/proxy/search-strategies/products-bling-search';
import { BlingSearchProxyModule } from '../../shared/bling/proxy/bling-search-proxy.module';
import { AuthModule } from '../auth/auth.module';
import { ProductsRepository } from './domain/repository/products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, PurchaseOrder, PurchaseOrderItem]),
    HttpModule,
    Repository,
    BlingSearchProxyModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsBlingSearch,
    ProductsPurchaseFactory,
    AuthModule,
    ProductsRepository,
  ],
  exports: [ProductsService, ProductsPurchaseFactory, ProductsRepository],
})
export class ProductsModule {}
