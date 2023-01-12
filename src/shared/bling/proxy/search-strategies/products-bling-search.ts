import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BLING_API_KEY, API_CONFIG_JSON } from '../../../helpers/constants';
import { BlingSearch } from '../../bling-search';

@Injectable()
export class ProductsBlingSearch extends BlingSearch {
  getModule(): string {
    return 'produtos';
  }

  public async getProductByCode(code: string): Promise<any> {
    const url = `https://bling.com.br/Api/v2/produto/${code}/json/?apikey=${BLING_API_KEY}&estoque=S`;
    console.log(url);
    const response = await lastValueFrom(
      this.httpService.get(url, API_CONFIG_JSON),
    );
    console.log(response.data);
    return response.data.retorno.produtos[0].produto;
  }
}
