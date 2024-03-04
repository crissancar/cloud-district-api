import { CreateManagerRequest } from '../../../../../../src/app/modules/managers/application/dtos/create-manager-request.dto';
import { Manager } from '../../../../../../src/app/modules/managers/domain/models/manager.model';
import { EmailMother } from '../../../shared/mothers/email.mother';
import { FullNameMother } from '../../../shared/mothers/full-name.mother';
import { NationalityMother } from '../../../shared/mothers/nationality.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class ManagerMother {
	static create(id: string, name: string, email: string, nationality: string): Manager {
		return Manager.create(id, name, email, nationality);
	}

	static fromRequest(request: CreateManagerRequest): Manager {
		const { id, name, email, nationality } = request;

		return this.create(id, name, email, nationality);
	}

	static random(): Manager {
		const id = UuidMother.random();
		const name = FullNameMother.random();
		const email = EmailMother.random();
		const nationaility = NationalityMother.random();

		return this.create(id, name, email, nationaility);
	}
}
