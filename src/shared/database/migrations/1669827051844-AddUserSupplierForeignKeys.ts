import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserSupplierForeignKeys1669827051844
  implements MigrationInterface
{
  name = 'AddUserSupplierForeignKeys1669827051844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'supplier',
      new TableForeignKey({
        name: 'fk_supplier_user',
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('supplier', 'fk_supplier_user');
  }
}
