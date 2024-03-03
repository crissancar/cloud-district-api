import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { clubId, playerId } = clubPropertiesSwagger;

export class ReleaseClubPlayerParams {
	@ApiProperty(clubId)
	@IsNotEmpty()
	@IsUUID()
	readonly clubId: string;

	@ApiProperty(playerId)
	@IsNotEmpty()
	@IsUUID()
	readonly playerId: string;
}
