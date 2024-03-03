import { UpdateClubBudgetRequest } from '../../../../../../src/app/modules/clubs/application/dtos/update-club-budget-request.dto';
import { NumberMother } from '../../../shared/mothers/number.mother';

export class UpdateClubBudgetRequestMother {
	static create(budget: string): UpdateClubBudgetRequest {
		return { budget };
	}

	static random(): UpdateClubBudgetRequest {
		return this.create(NumberMother.random(100000000, 900000000).toFixed(2));
	}
}
