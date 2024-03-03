import { Inject, Injectable } from '@nestjs/common';

import { PlayerRepository } from '../../domain/repositories/player.repository';
import { playersConfig } from '../../players.config';
import { FindPlayersByCriteriaRequest } from '../dtos/find-players-by-criteria-request.dto';
import { FindPlayersByCriteriaResponse } from '../dtos/find-players-by-criteria-response.dto';

const { repository } = playersConfig;
const { repositoryInterface } = repository;

@Injectable()
export class PlayersFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: PlayerRepository) {}

	async run(request: FindPlayersByCriteriaRequest): Promise<FindPlayersByCriteriaResponse> {
		const foundPlayers = await this.repository.findByCriteria(request);

		return FindPlayersByCriteriaResponse.create(request, foundPlayers);
	}
}
