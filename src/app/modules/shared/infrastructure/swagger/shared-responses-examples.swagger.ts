import { HttpStatus } from '@nestjs/common';

export const sharedResponsesExamplesSwagger = {
	unauthorized: {
		invalidApiKey: {
			InvalidApiKeyException: {
				description: 'Api key is not authenticated',
				value: {
					status: HttpStatus.UNAUTHORIZED,
					message: 'Invalid Api key',
				},
			},
		},
	},
};
