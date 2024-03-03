import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumberString } from 'class-validator';

import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { salary } = clubPropertiesSwagger;

export class SignClubPlayerRequest {
	@IsEmpty()
	readonly clubId?: string;

	@IsEmpty()
	readonly playerId?: string;

	@ApiProperty(salary)
	@IsNotEmpty()
	@IsNumberString()
	readonly salary: string;
}
