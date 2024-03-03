import { AssociateManagerWithClubRequest } from '../../../../../../src/app/modules/managers/application/dtos/associate-manager-with-club-request.dto';
import { NumberMother } from '../../../shared/mothers/number.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class AssociateManagerWithClubRequestMother {
	static create(clubId: string, salary: string): AssociateManagerWithClubRequest {
		return { clubId, salary };
	}

	static random(): AssociateManagerWithClubRequest {
		return this.create(UuidMother.random(), NumberMother.random().toFixed(2));
	}
}
