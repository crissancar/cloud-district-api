import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubManagerReleasedEventPayload } from '../../../clubs/domain/interfaces/club-manager-released-event-payload.interface';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { ManagerRepository } from '../../domain/repositories/manager.repository';
import { managersConfig } from '../../managers.config';
import { DisassociateManagerFromClubRequest } from '../dtos/disassociate-manager-from-club-request.dto';

const { repository, clubDisassociator } = managersConfig;
const { repositoryInterface } = repository;
const { context } = clubDisassociator.constants;
const { responseLog } = clubDisassociator.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class ManagerClubDisassociator {
	constructor(@Inject(repositoryInterface) private readonly repository: ManagerRepository) {}

	@OnEvent(ClubDomainEvents.MANAGER_RELEASED)
	async run(payload: ClubManagerReleasedEventPayload): Promise<void> {
		const { id } = payload.manager;
		const { id: clubId } = payload.club;
		const request = DisassociateManagerFromClubRequest.create();

		try {
			await this.repository.disassociateFromClub(id, request);

			logger.log(responseLog(id, clubId));
		} catch (error) {
			logger.error(error.message);
		}
	}
}
