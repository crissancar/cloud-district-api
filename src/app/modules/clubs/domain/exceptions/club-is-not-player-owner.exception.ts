import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class ClubIsNotPlayerOwnerException extends HttpException {
	constructor(context: string) {
		const message = 'Club is not player owner';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
