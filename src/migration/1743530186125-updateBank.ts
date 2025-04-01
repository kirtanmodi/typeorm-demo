import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBank1743530186125 implements MigrationInterface {
    name = 'UpdateBank1743530186125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_details" DROP COLUMN "iban"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_details" ADD "iban" character varying(100)`);
    }

}
