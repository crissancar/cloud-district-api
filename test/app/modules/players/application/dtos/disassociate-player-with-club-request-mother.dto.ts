import { DisassociatePlayerFromClubRequest } from '../../../../../../src/app/modules/players/application/dtos/disassociate-player-with-club-request.dto';

export class DisassociatePlayerFromClubRequestMother {
	static create(): DisassociatePlayerFromClubRequest {
		return { clubId: null, salary: null };
	}
}
