import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BlingSearchProxy } from '../../../../shared/bling/proxy/bling-search-proxy';
import { ProductsBlingSearch } from '../../../../shared/bling/proxy/search-strategies/products-bling-search';
import {
  BLING_API_KEY,
  API_CONFIG_JSON,
} from '../../../../shared/helpers/constants';
import { ProductsPurchaseFactory } from '../factory/product-factory';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsPurchaseFactory: ProductsPurchaseFactory,
    private httpService: HttpService,
    private blingSearchProxy: BlingSearchProxy,
    private productsBlingSearch: ProductsBlingSearch,
  ) {}

  public async listProducts(filter: string) {
    try {
      let response: any = await this.listAllProducts();
      if (filter) {
        const resFiltered = response.filter((el) => {
          const desc = el['produto']['descricao'];
          const cod = el['produto']['codigo'];
          return (
            desc.toUpperCase().indexOf(filter.toUpperCase()) >= 0 ||
            cod.indexOf(filter) >= 0
          );
        });
        response = resFiltered;
      }
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async listAllProducts(): Promise<any> {
    try {
      return await this.blingSearchProxy.getBlingData(
        'getProducts',
        false,
        this.productsBlingSearch,
      );
    } catch (error) {
      return error;
    }
  }

  public async listProductsByManufacturer(manufacturerId) {
    try {
      const allProducts = await this.listAllProducts();
      const retProducts = allProducts.filter(
        (item) => item.produto.idFabricante === manufacturerId,
      );

      return retProducts;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async listProductsSupplier(supplierName) {
    try {
      const allProducts = await this.listAllProducts();

      let retProducts = allProducts.filter((item) => {
        return item.produto.nomeFornecedor === supplierName;
      });

      retProducts =
        this.productsPurchaseFactory.buildManyPurchaseOrderSuppliers(
          retProducts,
        );
      return Promise.all(retProducts);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async getProductByCode(code: string): Promise<any> {
    //TODO: passar esta comunicação para uma classe responsavel (SOLID)
    const url = `https://bling.com.br/Api/v2/produto/${code}/json/?apikey=${BLING_API_KEY}&estoque=S`;

    const response = await lastValueFrom(
      this.httpService.get(url, API_CONFIG_JSON),
    );

    return response;
  }
}
