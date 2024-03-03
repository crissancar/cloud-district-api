export class CalculateClubRemainingBudgetRequest {
	readonly clubId: string;

	readonly playerSalary: string;

	constructor(clubId: string, playerSalary: string) {
		this.clubId = clubId;
		this.playerSalary = playerSalary;
	}

	static create(clubId: string, playerSalary: string): CalculateClubRemainingBudgetRequest {
		return new CalculateClubRemainingBudgetRequest(clubId, playerSalary);
	}
}
