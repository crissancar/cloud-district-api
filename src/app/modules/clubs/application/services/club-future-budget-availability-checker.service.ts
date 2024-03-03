import { Injectable } from '@nestjs/common';

import { ManagersFinderByClub } from '../../../managers/application/services/managers-finder-by-club.service';
import { PlayersFinderByClub } from '../../../players/application/services/players-finder-by-club.service';
import { Big } from '../../../shared/application/services/big.service';
import { clubsConfig } from '../../clubs.config';
import { InsufficientClubBudgetToPaySalariesException } from '../../domain/exceptions/insufficient-club-budget-to-pay-salaries.exception';
import { CheckClubFutureBudgetAvailabilityRequest } from '../dtos/check-club-future-budget-availability-request.dto';

const { futureBudgetAvailabilityChecker } = clubsConfig;
const { context } = futureBudgetAvailabilityChecker.constants;

@Injectable()
export class ClubFutureBudgetAvailabilityChecker {
	constructor(
		private readonly playersFinder: PlayersFinderByClub,
		private readonly managersFinder: ManagersFinderByClub,
	) {}

	async run(request: CheckClubFutureBudgetAvailabilityRequest): Promise<void> {
		const requestedBudget = Big.create(request.budget);

		const totalSalariesAmount = await this.calculateTotalSalariesAmount(request.clubId);

		if (this.isInsufficientBudget(requestedBudget, totalSalariesAmount)) {
			throw new InsufficientClubBudgetToPaySalariesException(context);
		}
	}

	private async calculateTotalSalariesAmount(clubId: string): Promise<Big.Big> {
		const [players, managers] = await Promise.all([
			this.playersFinder.run({ clubId }),
			this.managersFinder.run({ clubId }),
		]);

		const allEmployees = [...players, ...managers];

		return Big.round(
			allEmployees.reduce((totalSalariesAmount, employee) => {
				return Big.plus(totalSalariesAmount, Big.create(employee.salary));
			}, Big.create(0)),
		);
	}

	private isInsufficientBudget(requestedBudgetBig: Big.Big, totalSalariesAmount: Big.Big): boolean {
		const revisedBudget = Big.minus(requestedBudgetBig, totalSalariesAmount);

		return Big.lessThan(revisedBudget, 0);
	}
}
