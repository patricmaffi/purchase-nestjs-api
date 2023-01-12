import { SuppliersBlingSearch } from './../../../../shared/bling/proxy/search-strategies/suppliers-bling-search';
import { BlingSearchProxy } from './../../../../shared/bling/proxy/bling-search-proxy';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class SuppliersService {
  constructor(
    private blingSearchProxy: BlingSearchProxy,
    private suppliersBlingSearch: SuppliersBlingSearch,
  ) {}

  public async listFornecedor(params): Promise<any> {
    const { codigoFornecedor } = params;

    const res: any = await this.blingSearchProxy.getBlingData(
      'getSuppliers',
      false,
      this.suppliersBlingSearch,
    );
    if (codigoFornecedor) {
      return res.filter((x) => x.contato.codigo === codigoFornecedor);
    }
    return res;
  }

  public async listSuppliersParams(
    supplierCode: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    const params = { codigoFornecedor: supplierCode };
    return await this.listFornecedor(params);
  }
}
