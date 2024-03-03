import { Nullable } from '../../../shared/domain/types/nullable.type';

export class DisassociateManagerFromClubRequest {
	readonly clubId: Nullable<string>;

	readonly salary: Nullable<string>;

	constructor(clubId: Nullable<string>, salary: Nullable<string>) {
		this.clubId = clubId;
		this.salary = salary;
	}

	static create(): DisassociateManagerFromClubRequest {
		const clubId = null as Nullable<string>;
		const salary = null as Nullable<string>;

		return new DisassociateManagerFromClubRequest(clubId, salary);
	}
}
