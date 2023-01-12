import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddPurchaseOrderOrderInvoiceForeignKeys1669827347993
  implements MigrationInterface
{
  name = 'AddPurchaseOrderOrderInvoiceForeignKeys1669827347993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'order_invoice',
      new TableForeignKey({
        name: 'fk_order_invoice_purchase_order',
        columnNames: ['purchase_order_id'],
        referencedTableName: 'purchase_order',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'order_invoice',
      'fk_order_invoice_purchase_order',
    );
  }
}
