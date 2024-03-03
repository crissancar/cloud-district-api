import { HttpStatus } from '@nestjs/common';

export const sharedResponsesSwagger = {
	ok: {
		status: HttpStatus.OK,
		description: 'Ok',
	},
	created: {
		status: HttpStatus.CREATED,
		description: 'Ok',
	},
	badRequest: {
		description: 'Bad request',
	},
	unauthorized: {
		description: 'Unauthorized',
	},
};
