import { MigrationInterface, QueryRunner } from "typeorm";

export class Initaddress1743529741441 implements MigrationInterface {
    name = 'Initaddress1743529741441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."address_addresstype_enum" AS ENUM('HOME', 'WORK', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "zipCode" character varying(20) NOT NULL, "country" character varying(100) NOT NULL, "isPrimary" boolean NOT NULL DEFAULT false, "addressType" "public"."address_addresstype_enum", "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TYPE "public"."address_addresstype_enum"`);
    }

}
