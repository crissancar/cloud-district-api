import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubPlayerSignedEventPayload } from '../../../clubs/domain/interfaces/club-player-signed-event-payload.interface';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { PlayerRepository } from '../../domain/repositories/player.repository';
import { playersConfig } from '../../players.config';
import { AssociatePlayerWithClubRequest } from '../dtos/associate-player-with-club-request.dto';

const { repository, clubAssociator } = playersConfig;
const { repositoryInterface } = repository;
const { context } = clubAssociator.constants;
const { responseLog } = clubAssociator.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class PlayerClubAssociator {
	constructor(@Inject(repositoryInterface) private readonly repository: PlayerRepository) {}

	@OnEvent(ClubDomainEvents.PLAYER_SIGNED)
	async run(payload: ClubPlayerSignedEventPayload): Promise<void> {
		const { id: clubId } = payload.club;
		const { id, salary } = payload.player;
		const request = AssociatePlayerWithClubRequest.create(clubId, salary);

		try {
			await this.repository.associateWithClub(id, request);

			logger.log(responseLog(id, clubId));
		} catch (error) {
			logger.error(error.message);
		}
	}
}
