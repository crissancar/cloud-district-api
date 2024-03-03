import { CreateClubRequest } from '../../../../../../src/app/modules/clubs/application/dtos/create-club-request.dto';
import { Club } from '../../../../../../src/app/modules/clubs/domain/models/club.model';
import { FirstNameMother } from '../../../shared/mothers/first-name.mother';
import { NumberMother } from '../../../shared/mothers/number.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class ClubMother {
	static create(id: string, name: string, budget: string): Club {
		return Club.create(id, name, budget);
	}

	static fromRequest(request: CreateClubRequest): Club {
		const { id, name, budget } = request;

		return this.create(id, name, budget);
	}

	static random(): Club {
		const id = UuidMother.random();
		const name = FirstNameMother.random();
		const budget = NumberMother.random(100000000, 900000000).toFixed(2);

		return this.create(id, name, budget);
	}
}
