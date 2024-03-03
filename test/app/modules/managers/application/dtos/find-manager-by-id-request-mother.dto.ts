import { FindManagerByIdRequest } from '../../../../../../src/app/modules/managers/application/dtos/find-manager-by-id-request.dto';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class FindManagerByIdRequestMother {
	static create(id: string): FindManagerByIdRequest {
		return { id };
	}

	static random(): FindManagerByIdRequest {
		return this.create(UuidMother.random());
	}
}
