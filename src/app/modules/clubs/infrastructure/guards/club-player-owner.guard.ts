import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { Player } from '../../../players/domain/models/player.model';
import { clubsConfig } from '../../clubs.config';
import { ClubIsNotPlayerOwnerException } from '../../domain/exceptions/club-is-not-player-owner.exception';

const { clubPlayerOwnerGuard } = clubsConfig;
const { context } = clubPlayerOwnerGuard.constants;

@Injectable()
export class ClubPlayerOwnerGuard implements CanActivate {
	canActivate(executionContext: ExecutionContext): boolean {
		const request = executionContext.switchToHttp().getRequest<Request>();
		const { players: clubPlayers } = request.club;
		const { id: requestedPlayerId } = request.player;

		if (!this.isClubPlayer(clubPlayers, requestedPlayerId)) {
			throw new ClubIsNotPlayerOwnerException(context);
		}

		return true;
	}

	private isClubPlayer(clubPlayers: Array<Player>, requestedPlayerId: string): boolean {
		return clubPlayers.some((clubPlayer) => clubPlayer.id === requestedPlayerId);
	}
}
