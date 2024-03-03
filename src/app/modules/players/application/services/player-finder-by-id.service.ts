import { Inject, Injectable } from '@nestjs/common';

import { PlayerWithIdNotExistsException } from '../../domain/exceptions/player-with-id-not-exists.exception';
import { Player } from '../../domain/models/player.model';
import { PlayerRepository } from '../../domain/repositories/player.repository';
import { playersConfig } from '../../players.config';
import { FindPlayerByIdRequest } from '../dtos/find-player-by-id-request.dto';

const { repository, finderById } = playersConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class PlayerFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: PlayerRepository) {}

	async run(request: FindPlayerByIdRequest): Promise<Player> {
		const foundPlayer = await this.repository.findById(request.id);

		if (!foundPlayer) {
			throw new PlayerWithIdNotExistsException(context, request.id);
		}

		return foundPlayer;
	}
}
