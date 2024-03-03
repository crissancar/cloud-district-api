import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../interfaces/http-exception-data.interface';

export class UpdateNotAffectedAnyRows extends HttpException {
	constructor(alias: string) {
		const context = 'TypeOrmRepository';
		const message = `Update not affected any rows from table <${alias}>`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
