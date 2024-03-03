import { Big } from '../../../shared/application/services/big.service';

export class AssociatePlayerWithClubRequest {
	readonly clubId: string;

	readonly salary: string;

	constructor(clubId: string, salary: string) {
		this.clubId = clubId;
		this.salary = salary;
	}

	static create(clubId: string, salary: string): AssociatePlayerWithClubRequest {
		const salaryRounded = Big.createRoundedString(salary);

		return new AssociatePlayerWithClubRequest(clubId, salaryRounded);
	}
}
