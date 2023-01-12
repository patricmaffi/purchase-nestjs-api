import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ContactsBlingSearch } from './search-strategies/contacts-bling-search';
import { ProductsBlingSearch } from './search-strategies/products-bling-search';
import { SuppliersBlingSearch } from './search-strategies/suppliers-bling-search';
import { BlingSearchProxy } from './bling-search-proxy';

@Module({
  imports: [HttpModule],
  providers: [
    ProductsBlingSearch,
    SuppliersBlingSearch,
    ContactsBlingSearch,
    BlingSearchProxy,
  ],
  exports: [
    ProductsBlingSearch,
    SuppliersBlingSearch,
    ContactsBlingSearch,
    BlingSearchProxy,
  ],
})
export class BlingSearchProxyModule {}
