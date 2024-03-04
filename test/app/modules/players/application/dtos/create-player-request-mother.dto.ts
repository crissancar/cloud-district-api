import { CreatePlayerRequest } from '../../../../../../src/app/modules/players/application/dtos/create-player-request.dto';
import { EmailMother } from '../../../shared/mothers/email.mother';
import { FullNameMother } from '../../../shared/mothers/full-name.mother';
import { NationalityMother } from '../../../shared/mothers/nationality.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class CreatePlayerRequestMother {
	static create(id: string, name: string, email: string, nationality: string): CreatePlayerRequest {
		return { id, name, email, nationality };
	}

	static random(): CreatePlayerRequest {
		return this.create(
			UuidMother.random(),
			FullNameMother.random(),
			EmailMother.random(),
			NationalityMother.random(),
		);
	}
}
