import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderInvoicesService } from './domain/services/order-invoices.service';
import { OrderInvoicesController } from './application/controllers/order-invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInvoice } from './domain/entities/order-invoice.entity';
import { OrderInvoicesRepository } from './domain/repository/order-invoices.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([OrderInvoice])],
  controllers: [OrderInvoicesController],
  providers: [OrderInvoicesService, OrderInvoicesRepository],
  exports: [OrderInvoicesService, OrderInvoicesRepository],
})
export class OrderInvoicesModule {}
