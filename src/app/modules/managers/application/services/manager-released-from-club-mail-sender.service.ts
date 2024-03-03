import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';

import { FindClubByIdRequest } from '../../../clubs/application/dtos/find-club-request.dto';
import { ClubFinderById } from '../../../clubs/application/services/club-finder-by-id.service';
import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubManagerReleasedEventPayload } from '../../../clubs/domain/interfaces/club-manager-released-event-payload.interface';
import { Club } from '../../../clubs/domain/models/club.model';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { SendManagerReleasedFromClubMailException } from '../../domain/exceptions/send-manager-released-from-club-mail.exception';
import { ManagerMailer } from '../../domain/mailers/manager.mailer';
import { Manager } from '../../domain/models/manager.model';
import { managersConfig } from '../../managers.config';
import { FindManagerByIdRequest } from '../dtos/find-manager-by-id-request.dto';
import { ManagerFinderById } from './manager-finder-by-id.service';

const { releasedFromClubMailSender, mailer } = managersConfig;
const { mailerInterface } = mailer;
const { context } = releasedFromClubMailSender.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ManagerReleasedFromClubMailSender {
	constructor(
		@Inject(mailerInterface) private readonly mailer: ManagerMailer,
		private readonly managerFinder: ManagerFinderById,
		private readonly moduleRef: ModuleRef,
	) {}

	@OnEvent(ClubDomainEvents.MANAGER_RELEASED)
	async run(payload: ClubManagerReleasedEventPayload): Promise<void> {
		const { id: managerId } = payload.manager;
		const { id: clubId } = payload.club;

		try {
			const manager = await this.getManager(managerId);
			const club = await this.getClub(clubId);

			await this.mailer.releasedFromClub(manager, club);
		} catch (error) {
			logger.error(error);
			const exception = new SendManagerReleasedFromClubMailException(context, managerId);
			logger.error(exception.message);
		}
	}

	private async getManager(managerId: string): Promise<Manager> {
		const request = FindManagerByIdRequest.create(managerId);

		return this.managerFinder.run(request);
	}

	private async getClub(clubId: string): Promise<Club> {
		const clubFinder = this.moduleRef.get(ClubFinderById, { strict: false });
		const request = FindClubByIdRequest.create(clubId);

		return clubFinder.run(request);
	}
}
