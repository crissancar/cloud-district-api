import { ApiProperty } from '@nestjs/swagger';

import { ClubEntity } from '../../infrastructure/persistence/club.entity';
import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { id, name } = clubPropertiesSwagger;

export class FindClubResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	static create(foundManager: ClubEntity): FindClubResponse {
		const { id, name } = foundManager;

		return new FindClubResponse(id, name);
	}
}
