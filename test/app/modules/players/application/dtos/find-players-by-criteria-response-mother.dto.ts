import { FindPlayersByCriteriaResponse } from '../../../../../../src/app/modules/players/application/dtos/find-players-by-criteria-response.dto';
import { Player } from '../../../../../../src/app/modules/players/domain/models/player.model';

export class FindPlayersByCriteriaResponseMother {
	static create(
		players: Array<Player>,
		count: number,
		currentCount: number,
		take?: number,
		page?: number,
	): FindPlayersByCriteriaResponse {
		return { players, count, currentCount, take, page };
	}

	static fromExpectedPlayers(expectedPlayers: Array<Player>): FindPlayersByCriteriaResponse {
		const take = 10;
		const page = 1;
		const count = expectedPlayers.length;
		const currentCount = expectedPlayers.length;

		return this.create(expectedPlayers, count, currentCount, take, page);
	}
}
