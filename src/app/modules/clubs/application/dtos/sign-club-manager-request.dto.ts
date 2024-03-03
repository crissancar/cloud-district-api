import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { salary } = clubPropertiesSwagger;

export class SignClubManagerRequest {
	@IsOptional()
	readonly clubId?: string;

	@IsOptional()
	readonly managerId?: string;

	@ApiProperty(salary)
	@IsNotEmpty()
	@IsNumberString()
	readonly salary: string;
}
