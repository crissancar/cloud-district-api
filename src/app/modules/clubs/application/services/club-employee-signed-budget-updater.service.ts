import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { OnEvents } from '../../../shared/infrastructure/decorators/on-events.decorator';
import { clubsConfig } from '../../clubs.config';
import { ClubDomainEvents } from '../../domain/enums/club-domain-events.enum';
import { ClubManagerSignedEventPayload } from '../../domain/interfaces/club-manager-signed-event-payload.interface';
import { ClubPlayerSignedEventPayload } from '../../domain/interfaces/club-player-signed-event-payload.interface';
import { ClubRepository } from '../../domain/repositories/club.repository';
import { UpdateClubBudgetRequest } from '../dtos/update-club-budget-request.dto';

const { repository, employeeSignedBudgetUpdater } = clubsConfig;
const { repositoryInterface } = repository;
const { context } = employeeSignedBudgetUpdater.constants;
const { responseLog } = employeeSignedBudgetUpdater.logs;

const logger = LoggerFactory.create(context);

type ClubEmployeeSignedEventsPayload = ClubPlayerSignedEventPayload | ClubManagerSignedEventPayload;

@Injectable()
export class ClubEmployeeSignedBudgetUpdater {
	constructor(@Inject(repositoryInterface) private readonly repository: ClubRepository) {}

	@OnEvents([ClubDomainEvents.PLAYER_SIGNED, ClubDomainEvents.MANAGER_SIGNED])
	async run(payload: ClubEmployeeSignedEventsPayload): Promise<void> {
		const { id, remainingBudget } = payload.club;
		const request = UpdateClubBudgetRequest.create(remainingBudget);

		try {
			await this.repository.updateBudget(id, request);

			logger.log(responseLog(id, remainingBudget));
		} catch (error) {
			logger.error(error.message);
		}
	}
}
