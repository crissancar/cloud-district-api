import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { TransformToRoundedString } from '../../../shared/infrastructure/decorators/transform-to-rounded-string.decorator';
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
	@TransformToRoundedString()
	readonly budget: string;
}
