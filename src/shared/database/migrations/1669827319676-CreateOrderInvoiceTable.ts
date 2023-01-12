import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderInvoiceTable1669827319676
  implements MigrationInterface
{
  name = 'CreateOrderInvoiceTable1669827319676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_invoice',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'key',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'serial',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'purchase_order_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'time without time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'time without time zone',
            default: 'now()',
          },
        ],
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearSqlMemory();
    await queryRunner.dropTable('order_invoice');
  }
}
