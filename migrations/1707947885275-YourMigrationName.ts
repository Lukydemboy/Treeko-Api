import { MigrationInterface, QueryRunner } from "typeorm";

export class YourMigrationName1707947885275 implements MigrationInterface {
    name = 'YourMigrationName1707947885275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`verification-token\` (\`token\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_50c631b1db713a8213fd56b174\` (\`token\`), PRIMARY KEY (\`token\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`incubator\` (\`id\` varchar(36) NOT NULL, \`temperature\` float NOT NULL, \`name\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`egg\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`note\` varchar(255) NULL, \`laidAt\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`hatchedAt\` datetime NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clutchId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clutch\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`pairId\` varchar(36) NULL, \`incubatorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pair\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`pairedAt\` datetime NULL, \`image\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`maleId\` varchar(36) NULL, \`femaleId\` varchar(36) NULL, UNIQUE INDEX \`IDX_3eaf216329c5c50aedb94fa797\` (\`id\`), UNIQUE INDEX \`REL_273b294bf4d77d5469e7f14def\` (\`femaleId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`animal\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`gender\` varchar(255) NOT NULL DEFAULT 'unsexed', \`dateOfBirth\` datetime NOT NULL, \`image\` varchar(255) NULL, \`ownedByUs\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`avatar\` int NOT NULL DEFAULT '30', \`points\` int NOT NULL DEFAULT '0', \`username\` varchar(255) NULL, \`pushToken\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token-blacklist\` (\`token\` varchar(255) NOT NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`egg\` ADD CONSTRAINT \`FK_0acd1118e86fc38b7a28067ba99\` FOREIGN KEY (\`clutchId\`) REFERENCES \`clutch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clutch\` ADD CONSTRAINT \`FK_62e639fe7a079a013a893598609\` FOREIGN KEY (\`pairId\`) REFERENCES \`pair\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clutch\` ADD CONSTRAINT \`FK_9d160b7009bbbeb793fc1fc3060\` FOREIGN KEY (\`incubatorId\`) REFERENCES \`incubator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pair\` ADD CONSTRAINT \`FK_75f7fc5d8bdfd914797f17b40aa\` FOREIGN KEY (\`maleId\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pair\` ADD CONSTRAINT \`FK_273b294bf4d77d5469e7f14def6\` FOREIGN KEY (\`femaleId\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal\` ADD CONSTRAINT \`FK_e997856a961c8e833ee23886440\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animal\` DROP FOREIGN KEY \`FK_e997856a961c8e833ee23886440\``);
        await queryRunner.query(`ALTER TABLE \`pair\` DROP FOREIGN KEY \`FK_273b294bf4d77d5469e7f14def6\``);
        await queryRunner.query(`ALTER TABLE \`pair\` DROP FOREIGN KEY \`FK_75f7fc5d8bdfd914797f17b40aa\``);
        await queryRunner.query(`ALTER TABLE \`clutch\` DROP FOREIGN KEY \`FK_9d160b7009bbbeb793fc1fc3060\``);
        await queryRunner.query(`ALTER TABLE \`clutch\` DROP FOREIGN KEY \`FK_62e639fe7a079a013a893598609\``);
        await queryRunner.query(`ALTER TABLE \`egg\` DROP FOREIGN KEY \`FK_0acd1118e86fc38b7a28067ba99\``);
        await queryRunner.query(`DROP TABLE \`token-blacklist\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`animal\``);
        await queryRunner.query(`DROP INDEX \`REL_273b294bf4d77d5469e7f14def\` ON \`pair\``);
        await queryRunner.query(`DROP INDEX \`IDX_3eaf216329c5c50aedb94fa797\` ON \`pair\``);
        await queryRunner.query(`DROP TABLE \`pair\``);
        await queryRunner.query(`DROP TABLE \`clutch\``);
        await queryRunner.query(`DROP TABLE \`egg\``);
        await queryRunner.query(`DROP TABLE \`incubator\``);
        await queryRunner.query(`DROP INDEX \`IDX_50c631b1db713a8213fd56b174\` ON \`verification-token\``);
        await queryRunner.query(`DROP TABLE \`verification-token\``);
    }

}
