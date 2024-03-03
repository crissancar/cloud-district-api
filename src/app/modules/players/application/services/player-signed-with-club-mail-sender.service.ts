import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';

import { config } from '../../../../../config/app';
import { FindClubByIdRequest } from '../../../clubs/application/dtos/find-club-request.dto';
import { ClubFinderById } from '../../../clubs/application/services/club-finder-by-id.service';
import { ClubDomainEvents } from '../../../clubs/domain/enums/club-domain-events.enum';
import { ClubPlayerSignedEventPayload } from '../../../clubs/domain/interfaces/club-player-signed-event-payload.interface';
import { Club } from '../../../clubs/domain/models/club.model';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { SendPlayerSignedWithClubMailException } from '../../domain/exceptions/send-player-signed-with-club-mail.exception';
import { PlayerMailer } from '../../domain/mailers/player.mailer';
import { Player } from '../../domain/models/player.model';
import { playersConfig } from '../../players.config';
import { FindPlayerByIdRequest } from '../dtos/find-player-by-id-request.dto';
import { PlayerFinderById } from './player-finder-by-id.service';

const { sendgrid } = config;
const { signedWithClubMailSender, mailer } = playersConfig;
const { mailerInterface } = mailer;
const { context } = signedWithClubMailSender.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class PlayerSignedWithClubMailSender {
	constructor(
		@Inject(mailerInterface) private readonly mailer: PlayerMailer,
		private readonly playerFinder: PlayerFinderById,
		private readonly moduleRef: ModuleRef,
	) {}

	@OnEvent(ClubDomainEvents.PLAYER_SIGNED)
	async run(payload: ClubPlayerSignedEventPayload): Promise<void> {
		if (!sendgrid.enabled) {
			return;
		}
		const { id: playerId, salary } = payload.player;
		const { id: clubId } = payload.club;

		try {
			const player = await this.getPlayer(playerId, salary);
			const club = await this.getClub(clubId);

			await this.mailer.signedWithClub(player, club);
		} catch (error) {
			logger.error(error);
			const exception = new SendPlayerSignedWithClubMailException(context, playerId);
			logger.error(exception.message);
		}
	}

	private async getPlayer(playerId: string, salary: string): Promise<Player> {
		const request = FindPlayerByIdRequest.create(playerId);
		const player = await this.playerFinder.run(request);

		return { ...player, salary };
	}

	private async getClub(clubId: string): Promise<Club> {
		const clubFinder = this.moduleRef.get(ClubFinderById, { strict: false });
		const request = FindClubByIdRequest.create(clubId);

		return clubFinder.run(request);
	}
}
