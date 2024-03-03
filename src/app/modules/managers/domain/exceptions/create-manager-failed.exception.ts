import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class CreateManagerFailedException extends HttpException {
	constructor(context: string) {
		const message = 'Create Manager failed';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
