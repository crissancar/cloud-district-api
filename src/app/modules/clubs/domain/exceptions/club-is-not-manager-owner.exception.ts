import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class ClubIsNotManagerOwnerException extends HttpException {
	constructor(context: string) {
		const message = 'Club is not manager owner';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
