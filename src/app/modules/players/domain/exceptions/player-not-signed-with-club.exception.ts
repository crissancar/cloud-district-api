import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/infrastructure/interfaces/http-exception-data.interface';

export class PlayerNotSignedWithClubException extends HttpException {
	constructor(context: string, clubId: string) {
		const message = `Player is not signed with club <${clubId}>`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
