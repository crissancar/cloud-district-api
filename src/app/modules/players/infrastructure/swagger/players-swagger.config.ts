import { HttpStatus } from '@nestjs/common';

import { CreatePlayerRequest } from '../../application/dtos/create-player-request.dto';

export const playersSwaggerConfig = {
	tag: 'Players',
	create: {
		operation: {
			summary: 'Create player',
		},
		body: { type: CreatePlayerRequest },
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
