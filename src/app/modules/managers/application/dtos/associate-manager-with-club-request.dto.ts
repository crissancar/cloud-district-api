import { Big } from '../../../shared/application/services/big.service';

export class AssociateManagerWithClubRequest {
	readonly clubId: string;

	readonly salary: string;

	constructor(clubId: string, salary: string) {
		this.clubId = clubId;
		this.salary = salary;
	}

	static create(clubId: string, salary: string): AssociateManagerWithClubRequest {
		const salaryRounded = Big.createRoundedString(salary);

		return new AssociateManagerWithClubRequest(clubId, salaryRounded);
	}
}
