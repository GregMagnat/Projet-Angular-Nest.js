import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTable1714739349493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE table (
                id SERIAL PRIMARY KEY,
                number INT NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE table;
        `);
    }

}
