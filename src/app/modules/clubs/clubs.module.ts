import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagersModule } from '../managers/managers.module';
import { PlayersModule } from '../players/players.module';
import { ClubBudgetUpdater } from './application/services/club-budget-updater.service';
import { ClubCreator } from './application/services/club-creator.service';
import { ClubEmployeeReleasedBudgetUpdater } from './application/services/club-employee-released-budget-updater.service';
import { ClubEmployeeSignedBudgetUpdater } from './application/services/club-employee-signed-budget-updater.service';
import { ClubFinderById } from './application/services/club-finder-by-id.service';
import { ClubFutureBudgetAvailabilityChecker } from './application/services/club-future-budget-availability-checker.service';
import { ClubManagerReleaser } from './application/services/club-manager-releaser.service';
import { ClubManagerSigner } from './application/services/club-manager-signer.service';
import { ClubPlayerReleaser } from './application/services/club-player-releaser.service';
import { ClubPlayerSigner } from './application/services/club-player-signer.service';
import { ClubPlayersFinderByCriteria } from './application/services/club-players-finder-by-criteria.service';
import { ClubRemainingBudgetCalculator } from './application/services/club-remaining-budget-calculator.service';
import { ClubRevisedBudgetCalculator } from './application/services/club-revised-budget-calculator.service';
import { clubsConfig } from './clubs.config';
import { ClubGetController } from './infrastructure/controllers/club-get.controller';
import { ClubPostController } from './infrastructure/controllers/club-post.controller';
import { ClubPutController } from './infrastructure/controllers/club-put.controller';
import { ClubEntity } from './infrastructure/persistence/club.entity';
import { TypeOrmClubRepository } from './infrastructure/persistence/typeorm-club.repository';

const { repositoryInterface } = clubsConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([ClubEntity]), PlayersModule, ManagersModule],
	controllers: [ClubGetController, ClubPostController, ClubPutController],
	providers: [
		ClubBudgetUpdater,
		ClubCreator,
		ClubFinderById,
		ClubFutureBudgetAvailabilityChecker,
		ClubManagerReleaser,
		ClubManagerSigner,
		ClubPlayerReleaser,
		ClubEmployeeReleasedBudgetUpdater,
		ClubEmployeeSignedBudgetUpdater,
		ClubPlayerSigner,
		ClubPlayersFinderByCriteria,
		ClubRemainingBudgetCalculator,
		ClubRevisedBudgetCalculator,
		{ provide: repositoryInterface, useClass: TypeOrmClubRepository },
	],
	exports: [ClubFinderById],
})
export class ClubsModule {}
