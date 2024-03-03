import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

import { TransformToRoundedString } from '../../../shared/infrastructure/decorators/transform-to-rounded-string.decorator';
import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { budget } = clubPropertiesSwagger;

export class UpdateClubBudgetRequest {
	@ApiProperty(budget)
	@IsNotEmpty()
	@IsNumberString()
	@TransformToRoundedString()
	readonly budget: string;

	constructor(budget: string) {
		this.budget = budget;
	}

	static create(budget: string): UpdateClubBudgetRequest {
		return new UpdateClubBudgetRequest(budget);
	}
}
