import { Injectable } from '@nestjs/common';
import { PurchaseOrderItemRepository } from '../repository/purchase-order-item.repository';

@Injectable()
export class PurchaseOrderItemsService {
  constructor(
    private readonly purchaseOrderItemsRepository: PurchaseOrderItemRepository,
  ) {}

  //REVISAR O REMOVEPRODUCT
  public async removeProductParams(idprodped) {
    const params = { params: { idprodped: idprodped } };

    return await this.removeProduct(params);
  }
  public async removeProduct(params) {
    try {
      const idprodped = params.params;
      const prd = await this.purchaseOrderItemsRepository.find(idprodped);

      for (let i = 0; i < prd.length; i++) {
        if (prd) {
          await this.purchaseOrderItemsRepository.delete(prd[i]);
        }
        return { sucesso: 'temp' };
      }
    } catch (error) {
      console.log(error);
    }
    return { sucesso: 'errouuu' };
  }

  public async getPurchasesByProductCode(productCode) {
    const pedidos = await this.purchaseOrderItemsRepository
      .createQueryBuilder('PurchaseOrderItem')
      .leftJoinAndSelect('PurchaseOrderItem.purchaseOrder', 'purchaseOrder')
      .orderBy('PurchaseOrderItem.deliveryPrevision', 'ASC')
      .where('PurchaseOrderItem.productCode =:productCode', {
        productCode: productCode,
      })
      .getMany();
    return pedidos;
  }

  public async lastPurchaseByProductParams(codigoProduto) {
    const params = {
      params: {
        codigoProduto: codigoProduto,
      },
    };

    return await this.lastPurchaseByProduct(params);
  }

  public async lastPurchaseByProduct(params) {
    const { productCode } = params.params.productCode;

    const itemPedido = await this.purchaseOrderItemsRepository
      .createQueryBuilder('PurchaseOrderItem')
      .innerJoinAndSelect(
        'PurchaseOrderItem.purchaseOrder',
        'PurchaseOrder',
        'PurchaseOrder.status = :status',
        { status: 'confirmed' },
      )
      .where('PurchaseOrderItem.productCode = :productCode', {
        productCode: productCode,
      })
      .getOne();

    return itemPedido;
  }
}
