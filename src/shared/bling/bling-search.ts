import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import {
  BLING_API_KEY,
  API_CONFIG_JSON,
  BLING_API_URL_BASE,
} from '../helpers/constants';
import { syncWait } from '../helpers/utils';

@Injectable()
export abstract class BlingSearch {
  constructor(protected httpService: HttpService) {}

  @Inject(ConfigService)
  public config: ConfigService;

  abstract getModule(): string;

  private createUrl(page): string {
    return `${BLING_API_URL_BASE}/${this.getModule()}/page=${page}/json/?apikey=${BLING_API_KEY}&estoque=S`;
  }

  public async executeSearch() {
    let page = 1;
    const pageLimit = this.config.get('BLING_PAGE_LIMIT') || undefined;
    let next = true;
    let res = [];
    let response;

    do {
      let hasError = false;
      next = false;
      console.log(this.createUrl(page));

      try {
        response = await lastValueFrom(
          this.httpService.get(this.createUrl(page), API_CONFIG_JSON),
        );
      } catch {
        hasError = true;
        next = true;
        console.error('[REQUEST ERROR]');
      }

      if (response.data.retorno[this.getModule()]) {
        if (!hasError) {
          res = res.concat(response.data.retorno[this.getModule()]);
          page++;
        }
        next = true;
      }

      syncWait(1500);
      next = pageLimit ? page < pageLimit : next;
    } while (next);
    return res;
  }
}
