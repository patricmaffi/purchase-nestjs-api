import { ProductsService } from '../../domain/services/products.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { memoizeAsync } from 'utils-decorators';
import { IsPublic } from '../../../auth/decorators/is-public.decorator';

const cache = new Map();

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @memoizeAsync({
    cache: cache,
    expirationTimeMs: 1000 * 60 * 20,
  })
  async getProducts(@Query('filter') filter: string) {
    return await this.productsService.listProducts(filter);
  }

  @Get('/byManufacture/:manufacturerId')
  @memoizeAsync({
    cache: cache,
    expirationTimeMs: 1000 * 60 * 20,
  })
  async getProductsBysupplierCode(@Param('manufacturerId') manufacturerId) {
    return await this.productsService.listProductsByManufacturer(
      manufacturerId,
    );
  }

  @Get('/bySupplier/:supplierName')
  @memoizeAsync({
    cache: cache,
    expirationTimeMs: 1000 * 60 * 20,
  })
  async getProductsBySupplierName(@Param('supplierName') supplierName) {
    return await this.productsService.listProductsSupplier(supplierName);
  }

  @Get('/byCode/:code')
  async getProductsByCode(@Param('code') code) {
    return await this.productsService.getProductByCode(code);
  }

  @IsPublic()
  @Get('reset')
  resetCache() {
    return cache.clear();
  }
}
