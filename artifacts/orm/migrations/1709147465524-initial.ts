import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1709147465524 implements MigrationInterface {
    name = 'Initial1709147465524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."api_key_audience_enum" AS ENUM('GENERAL', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "api_key" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client" character varying NOT NULL, "description" character varying NOT NULL, "key" character varying NOT NULL, "audience" "public"."api_key_audience_enum" NOT NULL DEFAULT 'GENERAL', CONSTRAINT "UQ_fb080786c16de6ace7ed0b69f7d" UNIQUE ("key"), CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "nationality" character varying NOT NULL, "salary" character varying, "clubId" character varying, CONSTRAINT "UQ_7baa5220210c74f8db27c06f8b4" UNIQUE ("name"), CONSTRAINT "UQ_19b3d69e0f058936531e3965b77" UNIQUE ("email"), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "club" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "name" character varying NOT NULL, "budget" character varying NOT NULL, CONSTRAINT "UQ_79098e276529e2f823ab6379e8f" UNIQUE ("name"), CONSTRAINT "PK_79282481e036a6e0b180afa38aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manager" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "nationality" character varying NOT NULL, "salary" character varying, "clubId" character varying, CONSTRAINT "UQ_2139f9fe74b27988c29087bdea1" UNIQUE ("name"), CONSTRAINT "UQ_ee8fba4edb704ce2465753a2edd" UNIQUE ("email"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_11ec30ccb365809f1630cf14826" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_cc44500cc4be6d20280d05a1626" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_cc44500cc4be6d20280d05a1626"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_11ec30ccb365809f1630cf14826"`);
        await queryRunner.query(`DROP TABLE "manager"`);
        await queryRunner.query(`DROP TABLE "club"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "api_key"`);
        await queryRunner.query(`DROP TYPE "public"."api_key_audience_enum"`);
    }

}
