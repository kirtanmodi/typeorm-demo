import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBank21743530764823 implements MigrationInterface {
    name = 'UpdateBank21743530764823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_details" ADD "iban" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_details" DROP COLUMN "iban"`);
    }

}
