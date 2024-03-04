import { FindPlayersByCriteriaRequest } from '../../../../../../src/app/modules/players/application/dtos/find-players-by-criteria-request.dto';
import { Player } from '../../../../../../src/app/modules/players/domain/models/player.model';
import { SortColumn } from '../../../../../../src/app/modules/shared/domain/types/sort-column.type';
import { SortOrder } from '../../../../../../src/app/modules/shared/domain/types/sort-order.type';
import { FullNameMother } from '../../../shared/mothers/full-name.mother';

export class FindPlayersByCriteriaRequestMother {
	static create(
		clubId: string,
		name?: string,
		keyword?: string,
		sortName?: string,
		sortColumn?: SortColumn<Player>,
		sortOrder?: SortOrder,
		take?: number,
		page?: number,
	): FindPlayersByCriteriaRequest {
		return { clubId, name, keyword, sortName, sortColumn, sortOrder, take, page };
	}

	static fromExpectedPlayers(expectedPlayers: Array<Player>): FindPlayersByCriteriaRequest {
		const { name } = expectedPlayers[0];
		const keyword = name;
		const sortName = name;

		return this.create(name, keyword, sortName);
	}

	static random(clubId: string): FindPlayersByCriteriaRequest {
		const name = FullNameMother.random();
		const keyword = name;
		const sortName = name;

		return this.create(clubId, name, keyword, sortName);
	}
}
