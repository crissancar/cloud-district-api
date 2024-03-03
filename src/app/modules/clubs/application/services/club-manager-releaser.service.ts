import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { FindManagerByIdRequest } from '../../../managers/application/dtos/find-manager-by-id-request.dto';
import { ManagerFinderById } from '../../../managers/application/services/manager-finder-by-id.service';
import { isDomainException } from '../../../shared/application/services/domain-exception-handler.service';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { clubsConfig } from '../../clubs.config';
import { ClubDomainEvents } from '../../domain/enums/club-domain-events.enum';
import { ReleaseClubManagerFailedException } from '../../domain/exceptions/release-club-manager-failed.exception';
import { ClubManagerReleasedEventPayload } from '../../domain/interfaces/club-manager-released-event-payload.interface';
import { CalculateClubRevisedBudgetRequest } from '../dtos/calculate-club-revised-budget-request.dto';
import { ReleaseClubManagerRequest } from '../dtos/release-club-manager-request.dto';
import { ClubRevisedBudgetCalculator } from './club-revised-budget-calculator.service';

const { creator } = clubsConfig;
const { context, exceptions } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ClubManagerReleaser {
	constructor(
		private readonly clubRevisedBudgetCalculator: ClubRevisedBudgetCalculator,
		private readonly managerFinder: ManagerFinderById,
		private readonly emitter: EventEmitter2,
	) {}

	async run(request: ReleaseClubManagerRequest): Promise<void> {
		const { clubId, managerId } = request;

		try {
			const salary = await this.getManagerSalary(managerId);

			const revisedBudget = await this.getClubRevisedBudget(clubId, salary);

			this.emitClubManagerReleasedEvent(request, revisedBudget);
		} catch (error) {
			if (isDomainException(error, exceptions)) {
				throw error;
			}
			logger.error(error);
			throw new ReleaseClubManagerFailedException(context);
		}
	}

	private async getManagerSalary(managerId: string): Promise<string> {
		const request = FindManagerByIdRequest.create(managerId);
		const { salary } = await this.managerFinder.run(request);

		return salary;
	}

	private async getClubRevisedBudget(clubId: string, salary: string): Promise<string> {
		const request = CalculateClubRevisedBudgetRequest.create(clubId, salary);
		const { revisedBudget } = await this.clubRevisedBudgetCalculator.run(request);

		return revisedBudget;
	}

	private emitClubManagerReleasedEvent(
		request: ReleaseClubManagerRequest,
		revisedBudget: string,
	): void {
		const { clubId, managerId } = request;

		const payload: ClubManagerReleasedEventPayload = {
			club: { id: clubId, revisedBudget },
			manager: { id: managerId },
		};

		this.emitter.emit(ClubDomainEvents.MANAGER_RELEASED, payload);
	}
}
