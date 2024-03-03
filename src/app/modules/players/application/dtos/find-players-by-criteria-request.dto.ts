import { SortColumn } from '../../../shared/domain/types/sort-column.type';
import { SortOrder } from '../../../shared/domain/types/sort-order.type';
import { Player } from '../../domain/models/player.model';

export class FindPlayersByCriteriaRequest {
	readonly clubId: string;

	readonly name?: string;

	readonly keyword?: string;

	readonly sortName?: string;

	readonly sortColumn?: SortColumn<Player>;

	readonly sortOrder?: SortOrder;

	readonly take?: number;

	readonly page?: number;

	constructor(
		clubId: string,
		name: string,
		keyword: string,
		sortName: string,
		sortColumn: SortColumn<Player>,
		sortOrder: SortOrder,
		take: number,
		page: number,
	) {
		this.clubId = clubId;
		this.name = name;
		this.keyword = keyword;
		this.sortName = sortName;
		this.sortColumn = sortColumn;
		this.sortOrder = sortOrder;
		this.take = take;
		this.page = page;
	}
}
