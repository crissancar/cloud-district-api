import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ApiResponseExamples } from '../interfaces/api-response-examples.interface';

export const ApiCustomUnauthorizedResponse = (examples: ApiResponseExamples): MethodDecorator => {
	return applyDecorators(
		ApiUnauthorizedResponse({
			description: 'Unauthorized',
			content: {
				'application/json': {
					examples,
				},
			},
		}),
	);
};
