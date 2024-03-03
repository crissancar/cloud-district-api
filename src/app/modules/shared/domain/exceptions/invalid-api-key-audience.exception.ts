import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../infrastructure/interfaces/http-exception-data.interface';

export class InvalidApiKeyAudienceException extends HttpException {
	constructor(context: string) {
		const message = 'Invalid Api key audience';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
