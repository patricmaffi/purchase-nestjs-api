import { lastValueFrom } from 'rxjs';
import { ProductsService } from '../../../products/domain/services/products.service';
import { OrderInvoicesService } from '../../../order-invoices/domain/services/order-invoices.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { OrderInvoice } from '../../../order-invoices/domain/entities/order-invoice.entity';
import { PurchaseOrderItemsService } from '../../../purchase-order-items/domain/services/purchase-order-items.service';
import { Transactional } from 'typeorm-transactional';
import { PurchaseOrderFactory } from '../factory/purchase-order-factory';
import { ProductsPurchaseFactory } from '../../../products/domain/factory/product-factory';
import { PurchaseOrderItemFactory } from '../../../purchase-order-items/domain/factory/purchase-order-item-factory';
import { syncWait } from '../../../../shared/helpers/utils';
import { PurchaseOrderItemRepository } from '../../../purchase-order-items/domain/repository/purchase-order-item.repository';
import { PurchaseOrderRepository } from '../repository/purchase-order.repository';
import { ProductsRepository } from '../../../products/domain/repository/products.repository';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private httpService: HttpService,
    private readonly purchaseOrderRepository: PurchaseOrderRepository,
    private readonly purchaseOrderItemRepository: PurchaseOrderItemRepository,
    @InjectRepository(OrderInvoice)
    private readonly OrderInvoicesController: Repository<OrderInvoice>,
    private readonly productsRepository: ProductsRepository,
    private readonly orderInvoicesService: OrderInvoicesService,
    private readonly productsService: ProductsService,
    private readonly purchaseOrderItemsService: PurchaseOrderItemsService,
    private readonly purchaseOrderFactory: PurchaseOrderFactory,
    private readonly purchaseOrderItemFactory: PurchaseOrderItemFactory,
    private readonly productsPurchaseFactory: ProductsPurchaseFactory,
  ) {}

  public async listPedidos() {
    const pedidos = await this.purchaseOrderRepository.find();

    if (pedidos) {
      for (let i = 0; i < pedidos.length; i++) {
        const el = pedidos[i];
        const params = { params: { codigoFornecedor: el.supplierCode } };
        // const obj: any = await this.suppliersService.listFornecedor(params);

        // obj.map((element) => {
        //   if (el.supplierCode == element.contato.codigo) {
        //     el.supplierName = element.contato.nome;
        //   }
        // });
      }
      return pedidos;
    }
  }

  public async edit(purchaseOrderId: number) {
    const order = await this.purchaseOrderRepository.findOne({
      relations: {
        purchaseOrderItems: true,
      },
      where: {
        id: purchaseOrderId,
      },
    });
    for (let i = 0; i < order.purchaseOrderItems.length; i++) {
      const element = order.purchaseOrderItems[i];
      const blingprd = await this.productsService.getProductByCode(
        element.productCode,
      );
      element.description = blingprd.descricao;
      const lastBuy =
        await this.purchaseOrderItemRepository.lastPurchaseByProduct(
          element.productCode,
        );
      element['lastBuy'] = lastBuy;
      syncWait(1000);
    }

    // if (pedido.notas) {
    //   for (let i = 0; i < pedido.notas.length; i++) {
    //     let refNota = pedido.notas[i];
    //     let nota = await blingctrl.getXmlNotaByNumero({
    //       params: { serie: refNota.serie, numero: refNota.numero },
    //     });
    //     if (nota) {
    //       refNota.chave = nota[0].notafiscal.chaveAcesso;
    //       refNota['det'] = nota[0].det;
    //     } else {
    //       refNota.chave = 'NOTA NÃO ENCONTRADA';
    //       refNota['det'] = [];
    //     }
    //   }
    // }
    return order;
  }

  @Transactional()
  public async store(_pedido) {
    const data = _pedido;
    try {
      const order = this.purchaseOrderFactory.build(data);
      const savedOrder = await this.purchaseOrderRepository.save(order);

      const items = await this.purchaseOrderItemFactory.buildManyWithOrder(
        data.products,
        savedOrder,
      );
      await this.purchaseOrderItemRepository.save(items);

      const newProducts =
        await this.productsPurchaseFactory.buildManyNewProducts(data.products);
      await this.productsRepository.save(newProducts);

      const resultFindOne = await this.purchaseOrderRepository.save(savedOrder);
      const resultFindBy = await this.findPedidoById(resultFindOne.id);

      //TODO Verificar melhor forma de fazer este reset de cache
      await lastValueFrom(
        this.httpService.get('http://localhost:3333/products/reset'),
      );
      return resultFindBy;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  public async findOnePed(id) {
    const result = await this.purchaseOrderRepository
      .createQueryBuilder('PurchaseOrder')
      .innerJoinAndSelect(
        'PurchaseOrder.purchaseOrderItems',
        'purchaseOrderItems',
      )
      .where('PurchaseOrder.id = :id', {
        id: id,
      })
      .getOne();

    return result;
  }

  private async findPedidoById(id: number) {
    const result = await this.purchaseOrderRepository
      .createQueryBuilder('PurchaseOrder')
      .leftJoinAndSelect(
        'PurchaseOrder.purchaseOrderItems',
        'purchaseOrderItems',
      )
      .where('PurchaseOrder.id = :id', {
        id: id,
      })
      .getOne();

    return result;
  }

  public async findPedidoByProductCode(code: string) {
    const result = await this.purchaseOrderRepository.find({
      relations: {
        purchaseOrderItems: true,
      },
      where: {
        purchaseOrderItems: {
          productCode: code,
        },
      },
    });
    return result;
  }

  public async getByFornecedor(idFabricante, codFornecedor, forcereload) {
    /*
    const produtosFornecedor =
      await this.productsService.listProdutosByFornecedorParams1(
        idFabricante,
        forcereload,
      );

    const ret = produtosFornecedor.filter((element) => {
      const idFabricanteFilter = element.produto.idFabricante === idFabricante;
      return idFabricanteFilter;
    });

    const prodcodes = [] as any;

    for (let index = 0; index < ret.length; index++) {
      const produto = ret[index].produto;

      const pedidos = await this.getPurchasesByProductCode(produto.codigo);
      if (pedidos.length > 0) {
        produto['pedidos'] = pedidos;
      }
      prodcodes.push(produto.codigo);
    }

    //BUSCA PRODUTOS NOVOS QUE NÃO ESTÃO BLING
    if (prodcodes.length > 0) {
      const ped_prod = await this.productOrderRepository
        .createQueryBuilder('order_product')
        .innerJoinAndSelect('order_product.purchaseOrders', 'purchaseOrders')
        .innerJoinAndSelect('order_product.product', 'product')
        .where('order_product.productCode not in (:...codigos)', {
          codigos: prodcodes,
        })
        .andWhere('order_product.supplierCode = :codigoFornecedor', {
          codigoFornecedor: codFornecedor,
        })
        .getMany();

      for (let i = 0; i < ped_prod.length; i++) {
        if (!ped_prod[i].product) {
          continue;
        }

        for (let j = 0; j < ped_prod[i].product.length; j++) {
          const produto = {
            descricao: ped_prod[i].product[j].name,
            codigo: ped_prod[i].productCode,
            estoqueAtual: 0,
          };

          const pedidos = await this.getPurchasesByProductCode(produto.codigo);
          if (pedidos.length > 0) {
            produto['pedidos'] = pedidos;
          }
          const el = { produto: produto };
          ret.push(el);
        }
      }
    }

    return ret;
    */
  }
}
