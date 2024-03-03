export class CalculateClubRevisedBudgetRequest {
	readonly clubId: string;

	readonly playerSalary: string;

	constructor(clubId: string, playerSalary: string) {
		this.clubId = clubId;
		this.playerSalary = playerSalary;
	}

	static create(clubId: string, playerSalary: string): CalculateClubRevisedBudgetRequest {
		return new CalculateClubRevisedBudgetRequest(clubId, playerSalary);
	}
}
