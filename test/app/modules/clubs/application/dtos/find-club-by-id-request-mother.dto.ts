import { FindClubByIdRequest } from '../../../../../../src/app/modules/clubs/application/dtos/find-club-request.dto';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class FindClubByIdRequestMother {
	static create(clubId: string): FindClubByIdRequest {
		return { clubId };
	}

	static random(): FindClubByIdRequest {
		return this.create(UuidMother.random());
	}
}
