import { Club } from '../../../clubs/domain/models/club.model';
import { DynamicData } from '../../../shared/application/interfaces/dynamic-data.interface';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { SendgridSendMailRequest } from '../../../shared/infrastructure/mailers/dtos/sendgrid-send-mail-request.dto';
import { SendgridMailer } from '../../../shared/infrastructure/mailers/sendgrid.mailer';
import { PlayerMailer } from '../../domain/mailers/player.mailer';
import { Player } from '../../domain/models/player.model';
import { playersConfig } from '../../players.config';

const { sendgridMailer } = playersConfig;
const { context, from } = sendgridMailer.constants;
const { signedWithClub, releasedFromClub } = sendgridMailer.logs;
const { signedWithClubTemplate, releasedFromClubTemplate } = sendgridMailer.templates;

const logger = LoggerFactory.create(context);

export class SendgridPlayerMailer extends SendgridMailer implements PlayerMailer {
	async signedWithClub(player: Player, club: Club): Promise<void> {
		logger.log(signedWithClub.requestLog);

		const { name: playerName, salary: playerSalary } = player;
		const { name: clubName } = club;

		const { templateId } = signedWithClubTemplate;

		const dynamicTemplateData = { playerName, playerSalary, clubName } as DynamicData;

		await this.sendMail(player, templateId, dynamicTemplateData);
	}

	async releasedFromClub(player: Player, club: Club): Promise<void> {
		logger.log(releasedFromClub.requestLog);

		const { name: playerName } = player;
		const { name: clubName } = club;

		const { templateId } = releasedFromClubTemplate;

		const dynamicTemplateData = { playerName, clubName } as DynamicData;

		await this.sendMail(player, templateId, dynamicTemplateData);
	}

	private async sendMail(
		player: Player,
		templateId: string,
		dynamicTemplateData: DynamicData,
	): Promise<void> {
		const { email: to } = player;

		const request = SendgridSendMailRequest.create(from, to, templateId, dynamicTemplateData);

		await this.send(request);
	}
}
