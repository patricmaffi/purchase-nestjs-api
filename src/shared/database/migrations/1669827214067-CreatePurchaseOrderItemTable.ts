import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePurchaseOrderItemTable1669827214067
  implements MigrationInterface
{
  name = 'CreatePurchaseOrderItemTable1669827214067';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchase_order_item',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'unitary_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'discount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'purchase_order_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'manufacturer_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'delivery_prevision',
            type: 'timestamp without time zone',
            default: 'now()',
          },
          {
            name: 'request_date',
            type: 'timestamp without time zone',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            default: 'now()',
          },
        ],
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearSqlMemory();
    await queryRunner.dropTable('order_product');
  }
}
