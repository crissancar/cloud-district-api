import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';

import { FindClubByIdRequest } from '../../../clubs/application/dtos/find-club-request.dto';
import { ClubFinderById } from '../../../clubs/application/services/club-finder-by-id.service';
import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubManagerSignedEventPayload } from '../../../clubs/domain/interfaces/club-manager-signed-event-payload.interface';
import { Club } from '../../../clubs/domain/models/club.model';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { SendManagerSignedWithClubMailException } from '../../domain/exceptions/send-manager-signed-with-club-mail.exception';
import { ManagerMailer } from '../../domain/mailers/manager.mailer';
import { Manager } from '../../domain/models/manager.model';
import { managersConfig } from '../../managers.config';
import { FindManagerByIdRequest } from '../dtos/find-manager-by-id-request.dto';
import { ManagerFinderById } from './manager-finder-by-id.service';

const { signedWithClubMailSender, mailer } = managersConfig;
const { mailerInterface } = mailer;
const { context } = signedWithClubMailSender.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ManagerSignedWithClubMailSender {
	constructor(
		@Inject(mailerInterface) private readonly mailer: ManagerMailer,
		private readonly managerFinder: ManagerFinderById,
		private readonly moduleRef: ModuleRef,
	) {}

	@OnEvent(ClubDomainEvents.MANAGER_SIGNED)
	async run(payload: ClubManagerSignedEventPayload): Promise<void> {
		const { id: managerId, salary } = payload.manager;
		const { id: clubId } = payload.club;

		try {
			const manager = await this.getManager(managerId, salary);
			const club = await this.getClub(clubId);

			await this.mailer.signedWithClub(manager, club);
		} catch (error) {
			logger.error(error);
			const exception = new SendManagerSignedWithClubMailException(context, managerId);
			logger.error(exception.message);
		}
	}

	private async getManager(managerId: string, salary: string): Promise<Manager> {
		const request = FindManagerByIdRequest.create(managerId);
		const manager = await this.managerFinder.run(request);

		return { ...manager, salary };
	}

	private async getClub(clubId: string): Promise<Club> {
		const clubFinder = this.moduleRef.get(ClubFinderById, { strict: false });
		const request = FindClubByIdRequest.create(clubId);

		return clubFinder.run(request);
	}
}
