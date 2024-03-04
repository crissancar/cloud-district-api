import { CreatePlayerRequest } from '../../../../../../src/app/modules/players/application/dtos/create-player-request.dto';
import { Player } from '../../../../../../src/app/modules/players/domain/models/player.model';
import { EmailMother } from '../../../shared/mothers/email.mother';
import { FullNameMother } from '../../../shared/mothers/full-name.mother';
import { NationalityMother } from '../../../shared/mothers/nationality.mother';
import { UuidMother } from '../../../shared/mothers/uuid.mother';

export class PlayerMother {
	static create(id: string, name: string, email: string, nationality: string): Player {
		return Player.create(id, name, email, nationality);
	}

	static fromRequest(request: CreatePlayerRequest): Player {
		const { id, name, email, nationality } = request;

		return this.create(id, name, email, nationality);
	}

	static random(): Player {
		const id = UuidMother.random();
		const name = FullNameMother.random();
		const email = EmailMother.random();
		const nationaility = NationalityMother.random();

		return this.create(id, name, email, nationaility);
	}
}
