import { FindOptionsWhere } from 'typeorm';

import { SortColumn } from '../../domain/types/sort-column.type';
import { SortOrder } from '../../domain/types/sort-order.type';

export interface CriteriaQuery<T> {
	where: FindOptionsWhere<T>;
	take: number;
	page: number;
	skip: number;
	sortColumn: SortColumn<T>;
	sortOrder: SortOrder;
}
