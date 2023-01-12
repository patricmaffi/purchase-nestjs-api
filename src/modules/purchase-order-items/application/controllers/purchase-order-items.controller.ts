import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PurchaseOrderItemsService } from '../../domain/services/purchase-order-items.service';

@ApiBearerAuth()
@ApiTags('Order Products')
@Controller('purchase-order-items')
export class PurchaseOrderItemsController {
  constructor(
    private readonly purchaseOrderItemsService: PurchaseOrderItemsService,
  ) {}

  @Get('/lastp/:codigoProduto')
  async getLastPurchaseByProduct(@Param() codigoProduto) {
    return await this.purchaseOrderItemsService.lastPurchaseByProductParams(
      codigoProduto,
    );
  }

  @Get('/getPurchaseByProductCode/:codigoProduto')
  async getPurchasesByProductCode(@Param('codigoProduto') codigoProduto) {
    return await this.purchaseOrderItemsService.getPurchasesByProductCode(
      codigoProduto,
    );
  }
}
