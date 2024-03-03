import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumberString } from 'class-validator';

import { TransformToRoundedString } from '../../../shared/infrastructure/decorators/transform-to-rounded-string.decorator';
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
	@TransformToRoundedString()
	readonly salary: string;
}
