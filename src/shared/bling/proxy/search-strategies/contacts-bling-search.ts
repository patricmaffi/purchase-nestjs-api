import { Injectable } from '@nestjs/common';
import { BlingSearch } from '../../bling-search';

@Injectable()
export class ContactsBlingSearch extends BlingSearch {
  getModule(): string {
    return 'contatos';
  }
}
