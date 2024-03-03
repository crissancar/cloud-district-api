import { Provider } from '@nestjs/common';

import { ClubBudgetUpdater } from '../../../../src/app/modules/clubs/application/services/club-budget-updater.service';
import { ClubCreator } from '../../../../src/app/modules/clubs/application/services/club-creator.service';
import { ClubEmployeeReleasedBudgetUpdater } from '../../../../src/app/modules/clubs/application/services/club-employee-released-budget-updater.service';
import { ClubEmployeeSignedBudgetUpdater } from '../../../../src/app/modules/clubs/application/services/club-employee-signed-budget-updater.service';
import { ClubFinderById } from '../../../../src/app/modules/clubs/application/services/club-finder-by-id.service';
import { ClubFutureBudgetAvailabilityChecker } from '../../../../src/app/modules/clubs/application/services/club-future-budget-availability-checker.service';
import { ClubManagerReleaser } from '../../../../src/app/modules/clubs/application/services/club-manager-releaser.service';
import { ClubManagerSigner } from '../../../../src/app/modules/clubs/application/services/club-manager-signer.service';
import { ClubPlayerReleaser } from '../../../../src/app/modules/clubs/application/services/club-player-releaser.service';
import { ClubPlayerSigner } from '../../../../src/app/modules/clubs/application/services/club-player-signer.service';
import { ClubPlayersFinderByCriteria } from '../../../../src/app/modules/clubs/application/services/club-players-finder-by-criteria.service';
import { ClubRemainingBudgetCalculator } from '../../../../src/app/modules/clubs/application/services/club-remaining-budget-calculator.service';
import { ClubRevisedBudgetCalculator } from '../../../../src/app/modules/clubs/application/services/club-revised-budget-calculator.service';
import { clubsConfig } from '../../../../src/app/modules/clubs/clubs.config';
import { ClubRepositoryMock } from '../../../app/modules/clubs/__mocks__/club-repository.mock';

const { repositoryInterface } = clubsConfig.repository;

export const clubsModuleProviders: Array<Provider> = [
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
	{ provide: repositoryInterface, useClass: ClubRepositoryMock },
];
