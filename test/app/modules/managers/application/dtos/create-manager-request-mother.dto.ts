import { CreateManagerRequest } from '../../../../../../src/app/modules/managers/application/dtos/create-manager-request.dto';
import { EmailMother } from '../../../shared/mothers/email.mother';
import { FullNameMother } from '../../../shared/mothers/full-name.mother';
import { NationalityMother } from '../../../shared/mothers/nationality.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class CreateManagerRequestMother {
	static create(
		id: string,
		name: string,
		email: string,
		nationality: string,
	): CreateManagerRequest {
		return { id, name, email, nationality };
	}

	static random(): CreateManagerRequest {
		return this.create(
			UuidMother.random(),
			FullNameMother.random(),
			EmailMother.random(),
			NationalityMother.random(),
		);
	}
}
