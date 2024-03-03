import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { name, budget } = clubPropertiesSwagger;

export class CreateClubRequest {
	@IsOptional()
	readonly id: string;

	@ApiProperty(name)
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@ApiProperty(budget)
	@IsNotEmpty()
	@IsNumberString()
	readonly budget: string;
}
