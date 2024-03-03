import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { FindPlayerByIdRequest } from '../../../players/application/dtos/find-player-by-id-request.dto';
import { isDomainException } from '../../../shared/application/services/domain-exception-handler.service';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { clubsConfig } from '../../clubs.config';
import { ClubDomainEvents } from '../../domain/enums/club-domain-events.enum';
import { ReleaseClubPlayerFailedException } from '../../domain/exceptions/release-club-player-failed.exception';
import { ClubPlayerReleasedEventPayload } from '../../domain/interfaces/club-player-released-event-payload.interface';
import { CalculateClubRevisedBudgetRequest } from '../dtos/calculate-club-revised-budget-request.dto';
import { ReleaseClubPlayerRequest } from '../dtos/release-club-player-request.dto';
import { PlayerFinderById } from './../../../players/application/services/player-finder-by-id.service';
import { ClubRevisedBudgetCalculator } from './club-revised-budget-calculator.service';

const { creator } = clubsConfig;
const { context, exceptions } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ClubPlayerReleaser {
	constructor(
		private readonly clubRevisedBudgetCalculator: ClubRevisedBudgetCalculator,
		private readonly playerFinder: PlayerFinderById,
		private readonly emitter: EventEmitter2,
	) {}

	async run(request: ReleaseClubPlayerRequest): Promise<void> {
		const { clubId, playerId } = request;

		try {
			const salary = await this.getPlayerSalary(playerId);

			const revisedBudget = await this.getClubRevisedBudget(clubId, salary);

			this.emitClubPlayerReleasedEvent(request, revisedBudget);
		} catch (error) {
			if (isDomainException(error, exceptions)) {
				throw error;
			}
			logger.error(error);
			throw new ReleaseClubPlayerFailedException(context);
		}
	}

	private async getPlayerSalary(playerId: string): Promise<string> {
		const request = FindPlayerByIdRequest.create(playerId);
		const { salary } = await this.playerFinder.run(request);

		return salary;
	}

	private async getClubRevisedBudget(clubId: string, salary: string): Promise<string> {
		const request = CalculateClubRevisedBudgetRequest.create(clubId, salary);
		const { revisedBudget } = await this.clubRevisedBudgetCalculator.run(request);

		return revisedBudget;
	}

	private emitClubPlayerReleasedEvent(
		request: ReleaseClubPlayerRequest,
		revisedBudget: string,
	): void {
		const { clubId, playerId } = request;

		const payload: ClubPlayerReleasedEventPayload = {
			club: { id: clubId, revisedBudget },
			player: { id: playerId },
		};

		this.emitter.emit(ClubDomainEvents.PLAYER_RELEASED, payload);
	}
}
