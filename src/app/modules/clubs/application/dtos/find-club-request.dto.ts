export class FindClubByIdRequest {
	readonly clubId: string;

	constructor(clubId: string) {
		this.clubId = clubId;
	}

	static create(clubId: string): FindClubByIdRequest {
		return new FindClubByIdRequest(clubId);
	}
}
