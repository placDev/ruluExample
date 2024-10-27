import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1730031358448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'full_name',
                        type: 'varchar',
                        isGenerated: false,
                        isNullable: false,
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        isGenerated: false,
                        isNullable: false,
                    },
                    {
                        name: 'efficiency',
                        type: 'int',
                        isGenerated: false,
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
