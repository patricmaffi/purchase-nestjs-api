import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { OrderInvoicesModule } from './modules/order-invoices/order-invoices.module';
import { ProductsModule } from './modules/products/products.module';
import { PurchaseOrderItemsModule } from './modules/purchase-order-items/purchase-order-items.module';
import { PurchaseOrderModule } from './modules/purchase-order/purchase-order.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { UsersModule } from './modules/users/users.module';
import { BlingSearchModule } from './shared/bling/bling-search.module';
import { BlingSearchProxyModule } from './shared/bling/proxy/bling-search-proxy.module';
import { dataSourceOptions } from './shared/database/data-source';
import { getEnvPath } from './shared/helpers/env.helpers';

const envFilePath: string = getEnvPath(`${__dirname}`);

@Module({
  imports: [
    HttpModule,
    AuthModule,
    UsersModule,
    SuppliersModule,
    ProductsModule,
    PurchaseOrderModule,
    OrderInvoicesModule,
    PurchaseOrderItemsModule,
    BlingSearchModule,
    BlingSearchProxyModule,
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
