import { ManagerAlreadySignedException } from '../managers/domain/exceptions/manager-already-signed.exception';
import { ManagerWithIdNotExistsException } from '../managers/domain/exceptions/manager-with-id-not-exists.exception';
import { PlayerAlreadySignedException } from '../players/domain/exceptions/player-already-signed.exception';
import { PlayerWithIdNotExistsException } from '../players/domain/exceptions/player-with-id-not-exists.exception';
import { ClubWithIdNotExistsException } from './domain/exceptions/club-with-id-not-exists.exception';
import { InsufficientClubBudgetException } from './domain/exceptions/insufficient-club-budget.exception';
import { InsufficientClubBudgetToPaySalariesException } from './domain/exceptions/insufficient-club-budget-to-pay-salaries.exception';
import { SignClubPlayerFailedException } from './domain/exceptions/sign-club-player-failed.exception';
import { clubsSwaggerConfig } from './infrastructure/swagger/clubs-swagger.config';

export const clubsConfig = {
	entity: { name: 'club' },
	globalRoute: 'clubs',
	swagger: clubsSwaggerConfig,
	repository: {
		repositoryInterface: 'ClubRepository',
	},
	getController: {
		constants: {
			className: 'ClubGetController',
			routes: {
				findClubPlayersByCriteria: ':clubId/players',
			},
		},
		logs: {
			findClubPlayersByCriteria: {
				requestLog: 'Request received to find a club players by criteria filter',
			},
		},
	},
	postController: {
		constants: {
			className: 'ClubPostController',
			routes: {
				signClubPlayer: ':clubId/players/:playerId/sign',
				releaseClubPlayer: ':clubId/players/:playerId/release',
				signClubManager: ':clubId/managers/:managerId/sign',
				releaseClubManager: ':clubId/managers/:managerId/release',
			},
		},
		logs: {
			requestLog: 'Request received to create a new club',
		},
	},
	putController: {
		constants: {
			className: 'ClubPutController',
			routes: {
				updateBudget: ':clubId',
			},
		},
		logs: {
			requestLog: 'Request received to update a club',
		},
	},
	creator: {
		constants: {
			context: 'ClubCreator',
			exceptions: [ClubWithIdNotExistsException, PlayerWithIdNotExistsException],
		},
	},
	budgetUpdater: {
		constants: {
			context: 'ClubCreator',
			exceptions: [
				SignClubPlayerFailedException,
				ClubWithIdNotExistsException,
				InsufficientClubBudgetToPaySalariesException,
			],
		},
	},
	playerSigner: {
		constants: {
			context: 'ClubPlayerSigner',
			exceptions: [
				ClubWithIdNotExistsException,
				InsufficientClubBudgetException,
				PlayerAlreadySignedException,
				PlayerWithIdNotExistsException,
			],
		},
	},
	managerSigner: {
		constants: {
			context: 'ClubManagerSigner',
			exceptions: [
				ClubWithIdNotExistsException,
				InsufficientClubBudgetException,
				ManagerAlreadySignedException,
				ManagerWithIdNotExistsException,
			],
		},
	},
	finderById: {
		constants: {
			context: 'ClubFinderById',
		},
	},
	playersFinderByCriteria: {
		constants: {
			context: 'ClubPlayersFinderByCriteria',
		},
	},
	futureBudgetAvailabilityChecker: {
		constants: {
			context: 'ClubFutureBudgetAvailabilityChecker',
		},
	},
	remainingBudgetCalculator: {
		constants: {
			context: 'ClubRemainingBudgetCalculator',
		},
	},
	employeeReleasedBudgetUpdater: {
		constants: {
			context: 'ClubEmployeeReleasedBudgetUpdater',
		},
		logs: {
			responseLog: (id: string, revisedBudget: string): string =>
				`Club <${id}> budget update to <${revisedBudget}>`,
		},
	},
	employeeSignedBudgetUpdater: {
		constants: {
			context: 'ClubEmployeeSignedBudgetUpdater',
		},
		logs: {
			responseLog: (id: string, remainingBudget: string): string =>
				`Club <${id}> budget update to <${remainingBudget}>`,
		},
	},
	clubPlayerOwnerGuard: {
		constants: {
			context: 'ClubPlayerOwnerGuard',
		},
	},
	clubManagerOwnerGuard: {
		constants: {
			context: 'ClubManagerOwnerGuard',
		},
	},
};
