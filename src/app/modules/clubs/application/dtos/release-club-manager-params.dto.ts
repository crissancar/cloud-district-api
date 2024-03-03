import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { clubId, managerId } = clubPropertiesSwagger;

export class ReleaseClubManagerParams {
	@ApiProperty(clubId)
	@IsNotEmpty()
	@IsUUID()
	readonly clubId: string;

	@ApiProperty(managerId)
	@IsNotEmpty()
	@IsUUID()
	readonly managerId: string;
}
