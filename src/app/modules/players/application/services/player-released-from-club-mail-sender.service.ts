import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';

import { FindClubByIdRequest } from '../../../clubs/application/dtos/find-club-request.dto';
import { ClubFinderById } from '../../../clubs/application/services/club-finder-by-id.service';
import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubPlayerReleasedEventPayload } from '../../../clubs/domain/interfaces/club-player-released-event-payload.interface';
import { Club } from '../../../clubs/domain/models/club.model';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { SendPlayerReleasedFromClubMailException } from '../../domain/exceptions/send-player-released-from-club-mail.exception';
import { PlayerMailer } from '../../domain/mailers/player.mailer';
import { Player } from '../../domain/models/player.model';
import { playersConfig } from '../../players.config';
import { FindPlayerByIdRequest } from '../dtos/find-player-by-id-request.dto';
import { PlayerFinderById } from './player-finder-by-id.service';

const { releasedFromClubMailSender, mailer } = playersConfig;
const { mailerInterface } = mailer;
const { context } = releasedFromClubMailSender.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class PlayerReleasedFromClubMailSender {
	constructor(
		@Inject(mailerInterface) private readonly mailer: PlayerMailer,
		private readonly playerFinder: PlayerFinderById,
		private readonly moduleRef: ModuleRef,
	) {}

	@OnEvent(ClubDomainEvents.PLAYER_RELEASED)
	async run(payload: ClubPlayerReleasedEventPayload): Promise<void> {
		const { id: playerId } = payload.player;
		const { id: clubId } = payload.club;

		try {
			const player = await this.getPlayer(playerId);
			const club = await this.getClub(clubId);

			await this.mailer.releasedFromClub(player, club);
		} catch (error) {
			logger.error(error);
			const exception = new SendPlayerReleasedFromClubMailException(context, playerId);
			logger.error(exception.message);
		}
	}

	private async getPlayer(playerId: string): Promise<Player> {
		const request = FindPlayerByIdRequest.create(playerId);

		return this.playerFinder.run(request);
	}

	private async getClub(clubId: string): Promise<Club> {
		const clubFinder = this.moduleRef.get(ClubFinderById, { strict: false });
		const request = FindClubByIdRequest.create(clubId);

		return clubFinder.run(request);
	}
}
