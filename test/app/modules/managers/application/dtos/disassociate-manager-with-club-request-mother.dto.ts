import { DisassociateManagerFromClubRequest } from '../../../../../../src/app/modules/managers/application/dtos/disassociate-manager-from-club-request.dto';

export class DisassociateManagerFromClubRequestMother {
	static create(): DisassociateManagerFromClubRequest {
		return { clubId: null, salary: null };
	}
}
