import { FindOptionsWhere, ILike } from 'typeorm';

import { CriteriaQuery } from '../../../shared/application/interfaces/criteria-query.interface';
import { SortColumn } from '../../../shared/domain/types/sort-column.type';
import { SortOrder } from '../../../shared/domain/types/sort-order.type';
import { FindPlayersByCriteriaRequest } from '../../application/dtos/find-players-by-criteria-request.dto';
import { PlayerEntity } from './player.entity';

export class PlayerCriteriaQuery implements CriteriaQuery<PlayerEntity> {
	readonly where: FindOptionsWhere<PlayerEntity>;

	readonly name: string;

	readonly take: number;

	readonly page: number;

	readonly skip: number;

	readonly sortName: string;

	readonly sortColumn: SortColumn<PlayerEntity>;

	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<PlayerEntity>,
		name: string,
		take: number,
		page: number,
		sortName: string,
		sortColumn: SortColumn<PlayerEntity>,
		sortOrder: SortOrder,
	) {
		this.where = where;
		this.name = name;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortName = sortName;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindPlayersByCriteriaRequest): PlayerCriteriaQuery {
		const { clubId, name, keyword, take, page, sortName, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(clubId, name, keyword);

		return new PlayerCriteriaQuery(where, name, take, page, sortName, sortColumn, sortOrder);
	}

	private static createFindOptionsWhere(
		clubId: string,
		name: string,
		keyword: string,
	): FindOptionsWhere<PlayerEntity> {
		return {
			...(clubId && { clubId }),
			...(name && { name }),
			...(keyword && { name: ILike(`%${keyword}%`) }),
		};
	}
}
