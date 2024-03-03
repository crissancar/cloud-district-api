import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { Player } from '../../../players/domain/models/player.model';
import { SortColumn } from '../../../shared/domain/types/sort-column.type';
import { SortOrder } from '../../../shared/domain/types/sort-order.type';
import { ValidatePage } from '../../../shared/infrastructure/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../../shared/infrastructure/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../../shared/infrastructure/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../../shared/infrastructure/decorators/validate-take.decorator';
import { clubPropertiesSwagger } from '../../infrastructure/swagger/properties/club-properties.swagger';

const { nameParam, keyword, take, page, sortOrder, sortName, sortColumn } = clubPropertiesSwagger;

export class FindClubPlayersByCriteriaQuery {
	@ApiProperty(nameParam)
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty(keyword)
	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@ApiProperty(sortName)
	@IsOptional()
	@IsString()
	readonly sortName?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(Player)
	readonly sortColumn?: SortColumn<Player>;

	@ApiProperty(sortOrder)
	@ValidateSortOrder()
	readonly sortOrder?: SortOrder;

	@ApiProperty(take)
	@ValidateTake()
	readonly take?: number;

	@ApiProperty(page)
	@ValidatePage()
	readonly page?: number;
}
