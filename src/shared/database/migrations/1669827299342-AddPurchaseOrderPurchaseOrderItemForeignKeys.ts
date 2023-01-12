import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddPurchaseOrderPurchaseOrderItemForeignKeys1669827299342
  implements MigrationInterface
{
  name = 'AddPurchaseOrderPurchaseOrderItemForeignKeys1669827299342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'purchase_order_item',
      new TableForeignKey({
        name: 'fk_purchase_order_item_purchase_order',
        columnNames: ['purchase_order_id'],
        referencedTableName: 'purchase_order',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearSqlMemory();
    await queryRunner.dropForeignKey(
      'purchase_order_item',
      'fk_purchase_order_item_purchase_order',
    );
  }
}
