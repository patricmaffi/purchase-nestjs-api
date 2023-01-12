import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderInvoice } from '../entities/order-invoice.entity';

@Injectable()
export class OrderInvoicesRepository extends Repository<OrderInvoice> {
  constructor(private dataSource: DataSource) {
    super(OrderInvoice, dataSource.createEntityManager());
  }
}
