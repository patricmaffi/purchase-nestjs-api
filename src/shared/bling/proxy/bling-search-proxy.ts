import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BlingSearch } from '../bling-search';

@Injectable()
export class BlingSearchProxy {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async getBlingData(key: string, reload: boolean, search: BlingSearch) {
    let hasCache = await this.cacheManager.get(key);
    if (hasCache === undefined || reload) {
      const payload = await search.executeSearch();
      await this.cacheManager.set(key, payload, { ttl: 360000 });
      hasCache = await this.cacheManager.get(key);
    }
    return hasCache;
  }
}
