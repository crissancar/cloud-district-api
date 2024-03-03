import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class ManagerAlreadySignedException extends HttpException {
	constructor(context: string) {
		const message = 'Manager is already signed with a club';
		const exceptionData = { message, context } as HTTPExceptionData;
		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
