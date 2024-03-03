import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { OnEvents } from '../../../shared/infrastructure/decorators/on-events.decorator';
import { clubsConfig } from '../../clubs.config';
import { ClubDomainEvents } from '../../domain/enums/club-domain-events.enum';
import { ClubManagerReleasedEventPayload } from '../../domain/interfaces/club-manager-released-event-payload.interface';
import { ClubPlayerReleasedEventPayload } from '../../domain/interfaces/club-player-released-event-payload.interface';
import { ClubRepository } from '../../domain/repositories/club.repository';
import { UpdateClubBudgetRequest } from '../dtos/update-club-budget-request.dto';

const { repository, employeeReleasedBudgetUpdater } = clubsConfig;
const { repositoryInterface } = repository;
const { context } = employeeReleasedBudgetUpdater.constants;
const { responseLog } = employeeReleasedBudgetUpdater.logs;

const logger = LoggerFactory.create(context);

type ClubEmployeeReleasedEventsPayload =
	| ClubPlayerReleasedEventPayload
	| ClubManagerReleasedEventPayload;

@Injectable()
export class ClubEmployeeReleasedBudgetUpdater {
	constructor(@Inject(repositoryInterface) private readonly repository: ClubRepository) {}

	@OnEvents([ClubDomainEvents.PLAYER_RELEASED, ClubDomainEvents.MANAGER_RELEASED])
	async run(payload: ClubEmployeeReleasedEventsPayload): Promise<void> {
		const { id, revisedBudget } = payload.club;
		const request = UpdateClubBudgetRequest.create(revisedBudget);

		try {
			await this.repository.updateBudget(id, request);

			logger.log(responseLog(id, revisedBudget));
		} catch (error) {
			logger.error(error.message);
		}
	}
}
