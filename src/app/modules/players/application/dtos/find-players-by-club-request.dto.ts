export class FindPlayersByClubRequest {
	readonly clubId: string;

	constructor(clubId: string) {
		this.clubId = clubId;
	}

	static create(clubId: string): FindPlayersByClubRequest {
		return new FindPlayersByClubRequest(clubId);
	}
}
