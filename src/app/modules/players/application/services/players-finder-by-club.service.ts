import { Inject, Injectable } from '@nestjs/common';

import { Player } from '../../domain/models/player.model';
import { PlayerRepository } from '../../domain/repositories/player.repository';
import { playersConfig } from '../../players.config';
import { FindPlayersByClubRequest } from '../dtos/find-players-by-club-request.dto';

const { repository } = playersConfig;
const { repositoryInterface } = repository;

@Injectable()
export class PlayersFinderByClub {
	constructor(@Inject(repositoryInterface) private readonly repository: PlayerRepository) {}

	async run(request: FindPlayersByClubRequest): Promise<Array<Player>> {
		return this.repository.findAllByClub(request.clubId);
	}
}
