import { Supplier } from './domain/entities/supplier.entity';
import { Module } from '@nestjs/common';
import { SuppliersService } from './domain/services/suppliers.service';
import { SuppliersController } from './application/controllers/suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BlingSearchProxyModule } from '../../shared/bling/proxy/bling-search-proxy.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Supplier]),
    BlingSearchProxyModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService],
})
export class SuppliersModule {}
