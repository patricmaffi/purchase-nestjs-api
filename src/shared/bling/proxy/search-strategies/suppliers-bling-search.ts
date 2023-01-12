import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BlingSearch } from '../../bling-search';
import { BlingSearchProxy } from '../bling-search-proxy';
import { ContactsBlingSearch } from './contacts-bling-search';

@Injectable()
export class SuppliersBlingSearch extends BlingSearch {
  constructor(
    private proxy: BlingSearchProxy,
    private contactsSearch: ContactsBlingSearch,
    protected httpService: HttpService,
  ) {
    super(httpService);
  }

  getModule(): string {
    return 'contatos';
  }

  async executeSearch() {
    const contacts: any = await this.proxy.getBlingData(
      'getContacts',
      false,
      this.contactsSearch,
    );
    //Get only Suppliers by contacts
    return contacts.filter(
      (x) =>
        x.contato.tiposContato &&
        x.contato.tiposContato.filter(
          (i) => 'Fornecedor'.indexOf(i.tipoContato.descricao) >= 0,
        ).length > 0,
    );
  }
}
