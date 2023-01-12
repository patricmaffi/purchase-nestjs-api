import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddProductPurchaseOrderItemForeignKeys1669827268301
  implements MigrationInterface
{
  name = 'AddProductPurchaseOrderItemForeignKeys1669827268301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'fk_purchase_order_item_product',
        columnNames: ['purchase_order_item_id'],
        referencedTableName: 'purchase_order_item',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearSqlMemory();
    await queryRunner.dropForeignKey(
      'purchase_order_item',
      'fk_purchase_order_item_product',
    );
  }
}
