import { MigrationInterface, QueryRunner } from "typeorm";

export class Niitbank1743529889310 implements MigrationInterface {
    name = 'Niitbank1743529889310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "band_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bankName" character varying(100) NOT NULL, "accountNumber" character varying(100) NOT NULL, "routingNumber" character varying(100) NOT NULL, "swiftCode" character varying(100), "iban" character varying(100), "accountHolderName" character varying(100) NOT NULL, "isPrimary" boolean NOT NULL DEFAULT false, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9707a095501d225f01032393aec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "band_details" ADD CONSTRAINT "FK_e99470a1628da8785f4977a528f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "band_details" DROP CONSTRAINT "FK_e99470a1628da8785f4977a528f"`);
        await queryRunner.query(`DROP TABLE "band_details"`);
    }

}
