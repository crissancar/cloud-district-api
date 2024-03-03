import { Injectable } from '@nestjs/common';

import { PlayersFinderByCriteria } from '../../../players/application/services/players-finder-by-criteria.service';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { clubsConfig } from '../../clubs.config';
import { FindClubPlayersFailedException } from '../../domain/exceptions/find-club-players-failed.exception';
import { FindClubPlayersByCriteriaRequest } from '../dtos/find-club-players-by-criteria-request.dto';
import { FindClubPlayersByCriteriaResponse } from '../dtos/find-club-players-by-criteria-response.dto';

const { playersFinderByCriteria } = clubsConfig;
const { context } = playersFinderByCriteria.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ClubPlayersFinderByCriteria {
	constructor(private readonly playersFinder: PlayersFinderByCriteria) {}

	async run(request: FindClubPlayersByCriteriaRequest): Promise<FindClubPlayersByCriteriaResponse> {
		try {
			return await this.playersFinder.run(request);
		} catch (error) {
			logger.error(error);
			throw new FindClubPlayersFailedException(context);
		}
	}
}
