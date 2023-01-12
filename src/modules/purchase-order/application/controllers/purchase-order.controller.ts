import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PurchaseOrderService } from '../../domain/services/purchase-order.service';
import { PurchaseOrder } from '../../domain/entities/purchase-order.entity';

@ApiBearerAuth()
@ApiTags('Purchase Orders')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Get('/listPedidos')
  async getPedidosList() {
    return await this.purchaseOrderService.listPedidos();
  }

  @Get('/edit/:idpurchase')
  async edit(@Param('idpurchase') purchaseId) {
    return await this.purchaseOrderService.edit(purchaseId);
  }

  @Put()
  async update(@Body() purchaseOrder) {
    return await this.purchaseOrderService.store(purchaseOrder);
  }

  @Post()
  async create(@Body() pedido: PurchaseOrder) {
    return await this.purchaseOrderService.store(pedido);
  }

  @Get('/pedidos/list/:idFabricante/:codFornecedor/:forcereload')
  async getByFornecedor(
    @Param('idFabricante') idFabricante,
    @Param('codFornecedor') codFornecedor,
    @Param('forcereload') forcereload,
  ) {
    return await this.purchaseOrderService.getByFornecedor(
      idFabricante,
      codFornecedor,
      forcereload,
    );
  }

  @Get('/pedidos/list/:idFabricante/:codFornecedor')
  async getByFornecedor1(
    @Param('idFabricante') idFabricante,
    @Param('codFornecedor') codFornecedor,
  ) {
    return await this.purchaseOrderService.getByFornecedor(
      idFabricante,
      codFornecedor,
      false,
    );
  }

  @Get('/getOnePed/:id')
  async getOnePed(@Param('id') id) {
    return await this.purchaseOrderService.findOnePed(id);
  }

  @Get('/getByProdCode/:id')
  async getByProdCode(@Param('id') id) {
    return await this.purchaseOrderService.findPedidoByProductCode(id);
  }
}
