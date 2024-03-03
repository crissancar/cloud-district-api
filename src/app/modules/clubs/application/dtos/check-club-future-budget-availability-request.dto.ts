export class CheckClubFutureBudgetAvailabilityRequest {
	readonly clubId: string;

	readonly budget: string;

	constructor(clubId: string, budget: string) {
		this.clubId = clubId;
		this.budget = budget;
	}

	static create(clubId: string, budget: string): CheckClubFutureBudgetAvailabilityRequest {
		return new CheckClubFutureBudgetAvailabilityRequest(clubId, budget);
	}
}
