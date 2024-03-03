import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CheckManagerAvailabilityRequest } from '../../../managers/application/dtos/check-manager-availability-request.dto';
import { ManagerAvailabilityChecker } from '../../../managers/application/services/manager-availability-checker.service';
import { isDomainException } from '../../../shared/application/services/domain-exception-handler.service';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { clubsConfig } from '../../clubs.config';
import { ClubDomainEvents } from '../../domain/enums/club-domain-events.enum';
import { SignClubManagerFailedException } from '../../domain/exceptions/sign-club-manager-failed.exception';
import { ClubManagerSignedEventPayload } from '../../domain/interfaces/club-manager-signed-event-payload.interface';
import { CalculateClubRemainingBudgetRequest } from '../dtos/calculate-club-remaining-budget-request.dto';
import { SignClubManagerRequest } from '../dtos/sign-club-manager-request.dto';
import { ClubRemainingBudgetCalculator } from './club-remaining-budget-calculator.service';

const { managerSigner } = clubsConfig;
const { context, exceptions } = managerSigner.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ClubManagerSigner {
	constructor(
		private readonly managerAvalabilityChecker: ManagerAvailabilityChecker,
		private readonly clubRemainingBudgetCalculator: ClubRemainingBudgetCalculator,
		private readonly emitter: EventEmitter2,
	) {}

	async run(request: SignClubManagerRequest): Promise<void> {
		const { clubId, managerId, salary } = request;

		try {
			await this.checkManagerAvailability(managerId);

			const remainingBudget = await this.getClubRemainingBudget(clubId, salary);

			this.emitClubManagerSignedEvent(request, remainingBudget);
		} catch (error) {
			if (isDomainException(error, exceptions)) {
				throw error;
			}
			logger.error(error);
			throw new SignClubManagerFailedException(context);
		}
	}

	private async checkManagerAvailability(managerId: string): Promise<void> {
		const request = CheckManagerAvailabilityRequest.create(managerId);
		await this.managerAvalabilityChecker.run(request);
	}

	private async getClubRemainingBudget(clubId: string, salary: string): Promise<string> {
		const request = CalculateClubRemainingBudgetRequest.create(clubId, salary);
		const { remainingBudget } = await this.clubRemainingBudgetCalculator.run(request);

		return remainingBudget;
	}

	private emitClubManagerSignedEvent(
		request: SignClubManagerRequest,
		remainingBudget: string,
	): void {
		const { clubId, managerId, salary } = request;

		const payload: ClubManagerSignedEventPayload = {
			club: { id: clubId, remainingBudget },
			manager: { id: managerId, salary },
		};

		this.emitter.emit(ClubDomainEvents.MANAGER_SIGNED, payload);
	}
}
