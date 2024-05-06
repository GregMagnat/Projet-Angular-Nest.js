import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReservationTable1714739329242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE reservation (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(100) NOT NULL,
                date DATE NOT NULL,
                hour_start TIME NOT NULL,
                hour_end TIME NOT NULL,
                category_id INT REFERENCES category(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE reservation;
        `);
    }

}
