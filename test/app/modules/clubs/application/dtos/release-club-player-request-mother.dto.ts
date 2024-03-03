import { ReleaseClubPlayerRequest } from '../../../../../../src/app/modules/clubs/application/dtos/release-club-player-request.dto';

export class ReleaseClubPlayerRequestMother {
	static create(clubId: string, playerId: string): ReleaseClubPlayerRequest {
		return { clubId, playerId };
	}
}
