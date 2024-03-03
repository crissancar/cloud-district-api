import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubPlayerReleasedEventPayload } from '../../../clubs/domain/interfaces/club-player-released-event-payload.interface';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { PlayerRepository } from '../../domain/repositories/player.repository';
import { playersConfig } from '../../players.config';
import { DisassociatePlayerFromClubRequest } from '../dtos/disassociate-player-with-club-request.dto';

const { repository, clubDisassociator } = playersConfig;
const { repositoryInterface } = repository;
const { context } = clubDisassociator.constants;
const { responseLog } = clubDisassociator.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class PlayerClubDisassociator {
	constructor(@Inject(repositoryInterface) private readonly repository: PlayerRepository) {}

	@OnEvent(ClubDomainEvents.PLAYER_RELEASED)
	async run(payload: ClubPlayerReleasedEventPayload): Promise<void> {
		const { id } = payload.player;
		const { id: clubId } = payload.club;
		const request = DisassociatePlayerFromClubRequest.create();

		try {
			await this.repository.disassociateFromClub(id, request);

			logger.log(responseLog(id, clubId));
		} catch (error) {
			logger.error(error.message);
		}
	}
}
