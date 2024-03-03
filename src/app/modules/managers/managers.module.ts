import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagerAvailabilityChecker } from './application/services/manager-availability-checker.service';
import { ManagerClubAssociator } from './application/services/manager-club-associator.service';
import { ManagerClubDisassociator } from './application/services/manager-club-disassociator.service';
import { ManagerCreator } from './application/services/manager-creator.service';
import { ManagerFinderById } from './application/services/manager-finder-by-id.service';
import { ManagerReleasedFromClubMailSender } from './application/services/manager-released-from-club-mail-sender.service';
import { ManagerSignedWithClubMailSender } from './application/services/manager-signed-with-club-mail-sender.service';
import { ManagersFinderByClub } from './application/services/managers-finder-by-club.service';
import { ManagerPostController } from './infrastructure/controllers/manager-post.controller';
import { SendgridManagerMailer } from './infrastructure/mailers/sendgrid-manager.mailer';
import { ManagerEntity } from './infrastructure/persistence/manager.entity';
import { TypeOrmManagerRepository } from './infrastructure/persistence/typeorm-manager.repository';
import { managersConfig } from './managers.config';

const { repositoryInterface } = managersConfig.repository;
const { mailerInterface } = managersConfig.mailer;

@Module({
	imports: [TypeOrmModule.forFeature([ManagerEntity])],
	controllers: [ManagerPostController],
	providers: [
		ManagerAvailabilityChecker,
		ManagerClubAssociator,
		ManagerClubDisassociator,
		ManagerCreator,
		ManagerFinderById,
		ManagerReleasedFromClubMailSender,
		ManagerSignedWithClubMailSender,
		ManagersFinderByClub,
		{ provide: repositoryInterface, useClass: TypeOrmManagerRepository },
		{ provide: mailerInterface, useClass: SendgridManagerMailer },
	],
	exports: [ManagerAvailabilityChecker, ManagersFinderByClub, ManagerFinderById],
})
export class ManagersModule {}
