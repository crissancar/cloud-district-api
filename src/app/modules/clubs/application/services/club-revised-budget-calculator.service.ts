import { Injectable } from '@nestjs/common';

import { Big } from '../../../shared/application/services/big.service';
import { CalculateClubRevisedBudgetRequest } from '../dtos/calculate-club-revised-budget-request.dto';
import { CalculateClubRevisedBudgetResponse } from '../dtos/calculate-club-revised-budget-response.dto';
import { FindClubByIdRequest } from '../dtos/find-club-request.dto';
import { ClubFinderById } from './club-finder-by-id.service';

@Injectable()
export class ClubRevisedBudgetCalculator {
	constructor(private readonly finder: ClubFinderById) {}

	async run(
		request: CalculateClubRevisedBudgetRequest,
	): Promise<CalculateClubRevisedBudgetResponse> {
		const currentBudget = await this.getCurrentBudget(request.clubId);

		const revisedBudget = this.calculateRevisedBudget(currentBudget, request.playerSalary);

		return { revisedBudget };
	}

	private async getCurrentBudget(clubId: string): Promise<string> {
		const request = FindClubByIdRequest.create(clubId);
		const { budget } = await this.finder.run(request);

		return budget;
	}

	private calculateRevisedBudget(currentBudget: string, playerSalary: string): string {
		const currentBudgetBig = Big.create(currentBudget);
		const playerSalaryBig = Big.create(playerSalary);

		return Big.toRoundedString(Big.plus(currentBudgetBig, playerSalaryBig));
	}
}
