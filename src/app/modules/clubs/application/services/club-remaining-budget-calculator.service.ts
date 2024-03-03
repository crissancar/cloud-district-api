import { Injectable } from '@nestjs/common';

import { Big } from '../../../shared/application/services/big.service';
import { clubsConfig } from '../../clubs.config';
import { InsufficientClubBudgetException } from '../../domain/exceptions/insufficient-club-budget.exception';
import { CalculateClubRemainingBudgetRequest } from '../dtos/calculate-club-remaining-budget-request.dto';
import { CalculateClubRemainingBudgetResponse } from '../dtos/calculate-club-remaining-budget-response.dto';
import { ClubFinderById } from './club-finder-by-id.service';

const { remainingBudgetCalculator } = clubsConfig;
const { context } = remainingBudgetCalculator.constants;

@Injectable()
export class ClubRemainingBudgetCalculator {
	constructor(private readonly finder: ClubFinderById) {}

	async run(
		request: CalculateClubRemainingBudgetRequest,
	): Promise<CalculateClubRemainingBudgetResponse> {
		const currentBudget = await this.getCurrentBudget(request.clubId);

		const remainingBudget = this.calculateRemainingBudget(currentBudget, request.playerSalary);

		this.checkClubBudgetAvailability(remainingBudget);

		return { remainingBudget };
	}

	private async getCurrentBudget(clubId: string): Promise<string> {
		const { budget } = await this.finder.run({ clubId });

		return budget;
	}

	private calculateRemainingBudget(currentBudget: string, playerSalary: string): string {
		const currentBudgetBig = Big.create(currentBudget);
		const playerSalaryBig = Big.create(playerSalary);

		return Big.toRoundedString(Big.minus(currentBudgetBig, playerSalaryBig));
	}

	private checkClubBudgetAvailability(remainingBudget: string): void {
		const remainingBudgetBig = Big.create(remainingBudget);

		if (this.isInsufficientBudget(remainingBudgetBig)) {
			throw new InsufficientClubBudgetException(context);
		}
	}

	private isInsufficientBudget(remainingBudget: Big.Big): boolean {
		return Big.lessThan(remainingBudget, 0);
	}
}
