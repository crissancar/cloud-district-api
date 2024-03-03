import { HttpStatus } from '@nestjs/common';

export interface ApiResponseExamples {
	[key: string]: {
		description: string;
		value: {
			status: HttpStatus;
			message: string;
		};
	};
}
