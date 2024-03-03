import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubManagerSignedEventPayload } from '../../../clubs/domain/interfaces/club-manager-signed-event-payload.interface';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { ManagerRepository } from '../../domain/repositories/manager.repository';
import { managersConfig } from '../../managers.config';
import { AssociateManagerWithClubRequest } from '../dtos/associate-manager-with-club-request.dto';

const { repository, clubAssociator } = managersConfig;
const { repositoryInterface } = repository;
const { context } = clubAssociator.constants;
const { responseLog } = clubAssociator.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class ManagerClubAssociator {
	constructor(@Inject(repositoryInterface) private readonly repository: ManagerRepository) {}

	@OnEvent(ClubDomainEvents.MANAGER_SIGNED)
	async run(payload: ClubManagerSignedEventPayload): Promise<void> {
		const { id: clubId } = payload.club;
		const { id, salary } = payload.manager;
		const request = AssociateManagerWithClubRequest.create(clubId, salary);

		try {
			await this.repository.associateWithClub(id, request);

			logger.log(responseLog(id, clubId));
		} catch (error) {
			logger.error(error.message);
		}
	}
}
