import ResponseError from '@sendgrid/helpers/classes/response-error';
import SendGrid from '@sendgrid/mail';

import { config } from '../../../../../config/app';
import { LoggerFactory } from '../../application/services/logger-factory.service';
import { sendgridMailerConfig } from './config/sendgrid-mailer.config';
import { SendgridSendMailRequest } from './dtos/sendgrid-send-mail-request.dto';
import { SendgridException } from './exceptions/sendgrid.exception';

const { sendgrid } = config;

const { constants } = sendgridMailerConfig;
const { className } = constants;

const logger = LoggerFactory.create(className);

export class SendgridMailer {
	protected async send(request: SendgridSendMailRequest): Promise<void> {
		if (!sendgrid.enabled) {
			logger.log('Sendgrid disabled');

			return;
		}

		try {
			logger.debug({ data: request }, 'Sendgrid request');

			const result = await SendGrid.send(request);

			logger.debug({ data: result[0] }, 'Sendgrid response');
		} catch (error) {
			const exception = new SendgridException(request, error as ResponseError);

			logger.error(exception);
			throw exception;
		}
	}
}
