import { AssociatePlayerWithClubRequest } from '../../../../../../src/app/modules/players/application/dtos/associate-player-with-club-request.dto';
import { NumberMother } from '../../../shared/mothers/number.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class AssociatePlayerWithClubRequestMother {
	static create(clubId: string, salary: string): AssociatePlayerWithClubRequest {
		return { clubId, salary };
	}

	static random(): AssociatePlayerWithClubRequest {
		return this.create(UuidMother.random(), NumberMother.random().toFixed(2));
	}
}
