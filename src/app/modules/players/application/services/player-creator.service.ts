import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { TypeOrmError } from '../../../shared/application/services/typeorm-error.service';
import { CreatePlayerFailedException } from '../../domain/exceptions/create-player-failed.exception';
import { PlayerAlreadyExistsException } from '../../domain/exceptions/player-already-exists.exception';
import { Player } from '../../domain/models/player.model';
import { PlayerRepository } from '../../domain/repositories/player.repository';
import { playersConfig } from '../../players.config';
import { CreatePlayerRequest } from '../dtos/create-player-request.dto';

const { creator, repository } = playersConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class PlayerCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: PlayerRepository) {}

	async run(request: CreatePlayerRequest): Promise<void> {
		const player = this.createPlayerInstance(request);

		try {
			await this.repository.create(player);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new PlayerAlreadyExistsException(context);
			}
			logger.error(error);
			throw new CreatePlayerFailedException(context);
		}
	}

	private createPlayerInstance(request: CreatePlayerRequest): Player {
		const { id, name, email, nationality } = request;

		return Player.create(id, name, email, nationality);
	}
}
