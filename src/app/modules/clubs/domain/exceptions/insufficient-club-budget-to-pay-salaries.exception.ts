import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class InsufficientClubBudgetToPaySalariesException extends HttpException {
	constructor(context: string) {
		const message = 'Insufficient club budget to pay the salaries';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
