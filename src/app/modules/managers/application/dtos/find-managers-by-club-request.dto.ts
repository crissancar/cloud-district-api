export class FindManagersByClubRequest {
	readonly clubId: string;

	constructor(clubId: string) {
		this.clubId = clubId;
	}

	static create(clubId: string): FindManagersByClubRequest {
		return new FindManagersByClubRequest(clubId);
	}
}
