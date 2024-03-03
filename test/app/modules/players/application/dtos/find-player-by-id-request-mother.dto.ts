import { FindPlayerByIdRequest } from '../../../../../../src/app/modules/players/application/dtos/find-player-by-id-request.dto';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class FindPlayerByIdRequestMother {
	static create(id: string): FindPlayerByIdRequest {
		return { id };
	}

	static random(): FindPlayerByIdRequest {
		return this.create(UuidMother.random());
	}
}
