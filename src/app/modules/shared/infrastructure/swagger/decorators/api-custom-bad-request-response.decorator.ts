import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

import { ApiResponseExamples } from '../interfaces/api-response-examples.interface';

export const ApiCustomBadRequestResponse = (examples: ApiResponseExamples): MethodDecorator => {
	return applyDecorators(
		ApiBadRequestResponse({
			description: 'Bad Request',
			content: {
				'application/json': {
					examples,
				},
			},
		}),
	);
};
