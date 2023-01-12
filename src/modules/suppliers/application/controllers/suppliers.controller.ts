import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuppliersService } from '../../domain/services/suppliers.service';
import { memoizeAsync } from 'utils-decorators';

const cache = new Map();
@ApiBearerAuth()
@ApiTags('Suppliers')
@Controller('/suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  @memoizeAsync({
    cache: cache,
    expirationTimeMs: 1000 * 60 * 20,
  })
  async getSuppliers(
    @Query('search') search: string,
    @Query('supplierCode') supplierCode: string,
  ) {
    return await this.suppliersService.listSuppliersParams(
      supplierCode || undefined,
    );
  }

  @Get('reset')
  resetCache() {
    return cache.clear();
  }

  @Get('/:codigoFornecedor/:forcereload')
  async getSuppliersById(
    @Param('codigoFornecedor') codigoFornecedor,
    @Param('forcereload') forcereload,
  ) {
    return await this.suppliersService.listSuppliersParams(codigoFornecedor);
  }
}
