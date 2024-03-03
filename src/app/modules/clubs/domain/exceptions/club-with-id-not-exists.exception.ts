import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class ClubWithIdNotExistsException extends HttpException {
	constructor(context: string, id: string) {
		const message = `Club with id <${id}> not exists`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
