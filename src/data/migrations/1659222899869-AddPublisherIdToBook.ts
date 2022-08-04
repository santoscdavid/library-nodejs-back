import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddPublisherIdToBook1659222899869 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'books',
            new TableColumn({
                name: 'publisher_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'books',
            new TableForeignKey({
                name: 'BooksPublisher',
                columnNames: ['publisher_id'],
                referencedTableName: 'publishers',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('books', 'BooksPublisher');
        await queryRunner.dropColumn('books', 'publisher_id');
    }
}
