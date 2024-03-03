import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { clubId } = clubPropertiesSwagger;

export class FindClubPlayersByCriteriaParams {
	@ApiProperty(clubId)
	@IsNotEmpty()
	@IsUUID()
	readonly clubId: string;
}
