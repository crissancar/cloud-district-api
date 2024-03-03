import { Club } from '../../../clubs/domain/models/club.model';
import { DynamicData } from '../../../shared/application/interfaces/dynamic-data.interface';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { SendgridSendMailRequest } from '../../../shared/infrastructure/mailers/dtos/sendgrid-send-mail-request.dto';
import { SendgridMailer } from '../../../shared/infrastructure/mailers/sendgrid.mailer';
import { ManagerMailer } from '../../domain/mailers/manager.mailer';
import { Manager } from '../../domain/models/manager.model';
import { managersConfig } from '../../managers.config';

const { sendgridMailer } = managersConfig;
const { context, from } = sendgridMailer.constants;
const { signedWithClub, releasedFromClub } = sendgridMailer.logs;
const { signedWithClubTemplate, releasedFromClubTemplate } = sendgridMailer.templates;

const logger = LoggerFactory.create(context);

export class SendgridManagerMailer extends SendgridMailer implements ManagerMailer {
	async signedWithClub(manager: Manager, club: Club): Promise<void> {
		logger.log(signedWithClub.requestLog);
		const { name: managerName, salary: managerSalary } = manager;
		const { name: clubName } = club;

		const { templateId } = signedWithClubTemplate;

		const dynamicTemplateData = { managerName, managerSalary, clubName } as DynamicData;

		await this.sendMail(manager, templateId, dynamicTemplateData);
	}

	async releasedFromClub(manager: Manager, club: Club): Promise<void> {
		logger.log(releasedFromClub.requestLog);

		const { name: managerName } = manager;
		const { name: clubName } = club;

		const { templateId } = releasedFromClubTemplate;

		const dynamicTemplateData = { managerName, clubName } as DynamicData;

		await this.sendMail(manager, templateId, dynamicTemplateData);
	}

	private async sendMail(
		manager: Manager,
		templateId: string,
		dynamicTemplateData: DynamicData,
	): Promise<void> {
		// const { email: to } = manager;
		const to = 'cristiansanchezcarr@gmail.com';

		const request = SendgridSendMailRequest.create(from, to, templateId, dynamicTemplateData);

		await this.send(request);
	}
}
