import { CreateClubRequest } from '../../../../../../src/app/modules/clubs/application/dtos/create-club-request.dto';
import { FullNameMother } from '../../../shared/mothers/full-name.mother';
import { NumberMother } from '../../../shared/mothers/number.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class CreateClubRequestMother {
	static create(id: string, name: string, budget: string): CreateClubRequest {
		return { id, name, budget };
	}

	static random(): CreateClubRequest {
		return this.create(
			UuidMother.random(),
			FullNameMother.random(),
			NumberMother.random(100000000, 900000000).toFixed(2),
		);
	}
}
