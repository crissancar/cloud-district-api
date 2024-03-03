import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../../shared/application/interfaces/criteria-result.interface';
import { Player } from '../../domain/models/player.model';
import { playerPropertiesSwagger } from '../../infrastructure/swagger/properties/player-properties.swagger';
import { FindPlayersByCriteriaRequest } from './find-players-by-criteria-request.dto';

const { players, count, currentCount, take, page } = playerPropertiesSwagger;

export class FindPlayersByCriteriaResponse {
	@ApiProperty(players)
	readonly players: Array<Player>;

	@ApiProperty(count)
	readonly count: number;

	@ApiProperty(currentCount)
	readonly currentCount: number;

	@ApiProperty(take)
	readonly take: number;

	@ApiProperty(page)
	readonly page: number;

	constructor(
		data: Array<Player>,
		count: number,
		currentCount: number,
		take: number,
		page: number,
	) {
		this.players = data;
		this.count = count;
		this.currentCount = currentCount;
		this.take = take ?? 10;
		this.page = page ?? 1;
	}

	static create(
		request: FindPlayersByCriteriaRequest,
		criteriaResult: CriteriaResult<Player>,
	): FindPlayersByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = request;
		const currentCount = data.length;

		return new FindPlayersByCriteriaResponse(data, count, currentCount, take, page);
	}
}
