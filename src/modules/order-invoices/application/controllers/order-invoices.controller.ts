import { OrderInvoicesService } from '../../domain/services/order-invoices.service';
import { Body, Param, Post, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Order Invoices')
@UseGuards(AuthGuard('jwt'))
@Controller('notas-fiscais')
export class OrderInvoicesController {
  constructor(private readonly orderInvoicesService: OrderInvoicesService) {}

  @Get('/listarNotas/:tipo/:situacao')
  async listInvoices(@Param('tipo') type, @Param('situacao') situation) {
    return await this.orderInvoicesService.listInvoices(type, situation);
  }

  @Get('/getNotaByNumero/:serie/:numero')
  async getInvoiceByNumber(@Param('serie') serie, @Param('numero') numero) {
    return await this.orderInvoicesService.getInvoiceByNumberParams(
      serie,
      numero,
    );
  }

  @Post('/pedidos/storenota')
  async storenota(@Body() nota) {
    return await this.orderInvoicesService.storeNota(nota);
  }
}
