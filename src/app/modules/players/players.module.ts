import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerAvailabilityChecker } from './application/services/player-availability-checker.service';
import { PlayerClubAssociator } from './application/services/player-club-associator.service';
import { PlayerClubDisassociator } from './application/services/player-club-disassociator.service';
import { PlayerCreator } from './application/services/player-creator.service';
import { PlayerFinderById } from './application/services/player-finder-by-id.service';
import { PlayerReleasedFromClubMailSender } from './application/services/player-released-from-club-mail-sender.service';
import { PlayerSignedWithClubMailSender } from './application/services/player-signed-with-club-mail-sender.service';
import { PlayersFinderByClub } from './application/services/players-finder-by-club.service';
import { PlayersFinderByCriteria } from './application/services/players-finder-by-criteria.service';
import { PlayerPostController } from './infrastructure/controllers/player-post.controller';
import { SendgridPlayerMailer } from './infrastructure/mailers/sendgrid-player.mailer';
import { PlayerEntity } from './infrastructure/persistence/player.entity';
import { TypeOrmPlayerRepository } from './infrastructure/persistence/typeorm-player.repository';
import { playersConfig } from './players.config';

const { repositoryInterface } = playersConfig.repository;
const { mailerInterface } = playersConfig.mailer;

@Module({
	imports: [TypeOrmModule.forFeature([PlayerEntity])],
	controllers: [PlayerPostController],
	providers: [
		PlayerAvailabilityChecker,
		PlayerClubAssociator,
		PlayerClubDisassociator,
		PlayerCreator,
		PlayerFinderById,
		PlayerReleasedFromClubMailSender,
		PlayersFinderByClub,
		PlayersFinderByCriteria,
		PlayerSignedWithClubMailSender,
		{ provide: repositoryInterface, useClass: TypeOrmPlayerRepository },
		{ provide: mailerInterface, useClass: SendgridPlayerMailer },
	],
	exports: [
		PlayerAvailabilityChecker,
		PlayersFinderByClub,
		PlayerFinderById,
		PlayersFinderByCriteria,
	],
})
export class PlayersModule {}
