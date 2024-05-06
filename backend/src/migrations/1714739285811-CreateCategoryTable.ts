import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1714739285811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE category (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE category;
        `);
    }
}
