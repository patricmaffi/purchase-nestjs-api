import { SuppliersBlingSearch } from './proxy/search-strategies/suppliers-bling-search';
import { ProductsBlingSearch } from './proxy/search-strategies/products-bling-search';
import { BlingSearchProxy } from './proxy/bling-search-proxy';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ContactsBlingSearch } from './proxy/search-strategies/contacts-bling-search';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class BlingSearchTaskScheduler implements OnModuleInit {
  constructor(
    private blingProxy: BlingSearchProxy,
    private contactsBlingSearch: ContactsBlingSearch,
    private suppliersBlingSearch: SuppliersBlingSearch,
    private productsBlingSearch: ProductsBlingSearch,
  ) {}

  onModuleInit() {
    this.execute();
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async execute() {
    await this.blingProxy.getBlingData(
      'getContacts',
      true,
      this.contactsBlingSearch,
    );
    await this.blingProxy.getBlingData(
      'getSuppliers',
      true,
      this.suppliersBlingSearch,
    );
    await this.blingProxy.getBlingData(
      'getProducts',
      true,
      this.productsBlingSearch,
    );
  }
}
