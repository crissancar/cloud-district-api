import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { budget } = clubPropertiesSwagger;

export class UpdateClubBudgetRequest {
	@ApiProperty(budget)
	@IsNotEmpty()
	@IsNumberString()
	readonly budget: string;

	constructor(budget: string) {
		this.budget = budget;
	}

	static create(budget: string): UpdateClubBudgetRequest {
		return new UpdateClubBudgetRequest(budget);
	}
}
