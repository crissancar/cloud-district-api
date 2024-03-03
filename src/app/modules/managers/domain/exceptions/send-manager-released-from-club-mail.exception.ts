import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class SendManagerReleasedFromClubMailException extends HttpException {
	constructor(context: string, id: string) {
		const message = `Send mail to released manager <${id}> failed`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
