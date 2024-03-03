import { HttpStatus } from '@nestjs/common';

import { CreateManagerRequest } from '../../application/dtos/create-manager-request.dto';

export const managersSwaggerConfig = {
	tag: 'Managers',
	create: {
		operation: {
			summary: 'Create manager',
		},
		body: { type: CreateManagerRequest },
		response: {
			created: {
				status: HttpStatus.CREATED,
				description: 'Created',
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
};
