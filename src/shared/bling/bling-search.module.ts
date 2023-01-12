import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlingSearchTaskScheduler } from './bling-search-task-scheduler';
import { BlingSearchProxyModule } from './proxy/bling-search-proxy.module';

@Module({
  imports: [HttpModule, BlingSearchProxyModule, CacheModule.register()],
  providers: [BlingSearchTaskScheduler],
  exports: [BlingSearchTaskScheduler],
})
export class BlingSearchModule {}
