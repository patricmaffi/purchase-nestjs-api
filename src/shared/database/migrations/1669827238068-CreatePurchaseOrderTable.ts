import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePurchaseOrderTable1669827238068
  implements MigrationInterface
{
  name = 'CreatePurchaseOrderTable1669827238068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchase_order',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'order_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'supplier_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'supplier_name',
            type: 'varchar',
          },
          {
            name: 'manufacturer_code',
            type: 'varchar',
          },
          {
            name: 'shipping_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'total_order_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'payment_terms',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
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
