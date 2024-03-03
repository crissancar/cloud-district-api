import ResponseError from '@sendgrid/helpers/classes/response-error';

import { SendgridSendMailRequest } from '../dtos/sendgrid-send-mail-request.dto';

export class SendgridException extends Error {
	readonly code;
	readonly message;
	readonly request;
	readonly response;

	constructor(request: SendgridSendMailRequest, error: ResponseError) {
		super();
		const { code, message, response } = error;
		this.name = 'SendgridException';
		this.code = code;
		this.message = message;
		this.request = request;
		this.response = response;
	}
}
