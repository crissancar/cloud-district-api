import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CheckPlayerAvailabilityRequest } from '../../../players/application/dtos/check-player-availability-request.dto';
import { PlayerAvailabilityChecker } from '../../../players/application/services/player-availability-checker.service';
import { isDomainException } from '../../../shared/application/services/domain-exception-handler.service';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { clubsConfig } from '../../clubs.config';
import { ClubDomainEvents } from '../../domain/enums/club-domain-events.enum';
import { SignClubPlayerFailedException } from '../../domain/exceptions/sign-club-player-failed.exception';
import { ClubPlayerSignedEventPayload } from '../../domain/interfaces/club-player-signed-event-payload.interface';
import { CalculateClubRemainingBudgetRequest } from '../dtos/calculate-club-remaining-budget-request.dto';
import { SignClubPlayerRequest } from '../dtos/sign-club-player-request.dto';
import { ClubRemainingBudgetCalculator } from './club-remaining-budget-calculator.service';

const { playerSigner } = clubsConfig;
const { context, exceptions } = playerSigner.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ClubPlayerSigner {
	constructor(
		private readonly playerAvalabilityChecker: PlayerAvailabilityChecker,
		private readonly clubRemainingBudgetCalculator: ClubRemainingBudgetCalculator,
		private readonly emitter: EventEmitter2,
	) {}

	async run(request: SignClubPlayerRequest): Promise<void> {
		const { clubId, playerId, salary } = request;

		try {
			await this.checkPlayerAvailability(playerId);

			const remainingBudget = await this.getClubRemainingBudget(clubId, salary);

			this.emitClubPlayerSignedEvent(request, remainingBudget);
		} catch (error) {
			if (isDomainException(error, exceptions)) {
				throw error;
			}
			logger.error(error);
			throw new SignClubPlayerFailedException(context);
		}
	}

	private async checkPlayerAvailability(playerId: string): Promise<void> {
		const request = CheckPlayerAvailabilityRequest.create(playerId);
		await this.playerAvalabilityChecker.run(request);
	}

	private async getClubRemainingBudget(clubId: string, salary: string): Promise<string> {
		const request = CalculateClubRemainingBudgetRequest.create(clubId, salary);
		const { remainingBudget } = await this.clubRemainingBudgetCalculator.run(request);

		return remainingBudget;
	}

	private emitClubPlayerSignedEvent(request: SignClubPlayerRequest, remainingBudget: string): void {
		const { clubId, playerId, salary } = request;

		const payload: ClubPlayerSignedEventPayload = {
			club: { id: clubId, remainingBudget },
			player: { id: playerId, salary },
		};

		this.emitter.emit(ClubDomainEvents.PLAYER_SIGNED, payload);
	}
}
