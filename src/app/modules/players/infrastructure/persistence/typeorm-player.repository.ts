import { FindManyOptions, FindOneOptions } from 'typeorm';

import { CriteriaResult } from '../../../shared/application/interfaces/criteria-result.interface';
import { ClassTransformer } from '../../../shared/application/services/class-transformer.service';
import { GenericEntityClassOrSchema } from '../../../shared/domain/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../shared/domain/types/nullable.type';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm.repository';
import { AssociatePlayerWithClubRequest } from '../../application/dtos/associate-player-with-club-request.dto';
import { DisassociatePlayerFromClubRequest } from '../../application/dtos/disassociate-player-with-club-request.dto';
import { FindPlayersByCriteriaRequest } from '../../application/dtos/find-players-by-criteria-request.dto';
import { Player } from '../../domain/models/player.model';
import { PlayerRepository } from '../../domain/repositories/player.repository';
import { PlayerEntity } from './player.entity';
import { PlayerCriteriaQuery } from './player-criteria.query';

export class TypeOrmPlayerRepository
	extends TypeOrmRepository<PlayerEntity>
	implements PlayerRepository
{
	async associateWithClub(id: string, request: AssociatePlayerWithClubRequest): Promise<void> {
		await this.persistPartialEntity(id, request);
	}

	async create(player: Player): Promise<void> {
		const entity = ClassTransformer.modelToEntity(player, PlayerEntity);

		await this.persistEntity(entity);
	}

	async disassociateFromClub(
		id: string,
		request: DisassociatePlayerFromClubRequest,
	): Promise<void> {
		await this.persistPartialEntity(id, request);
	}

	async findById(id: string): Promise<Nullable<Player>> {
		const options = { where: { id } } as FindOneOptions<PlayerEntity>;

		const entity = await this.findOneEntity(options);

		return ClassTransformer.entityToModel(entity, Player);
	}

	async findAllByClub(clubId: string): Promise<Array<Player>> {
		const options = {
			select: ['id', 'name', 'salary'],
			where: { clubId },
		} as FindManyOptions<PlayerEntity>;

		const foundPlayersEntities = await this.findManyEntities(options);

		return ClassTransformer.entitiesToModels(foundPlayersEntities, Player);
	}

	async findByCriteria(request: FindPlayersByCriteriaRequest): Promise<CriteriaResult<Player>> {
		const { where, take, skip, sortName, sortOrder, sortColumn } =
			PlayerCriteriaQuery.create(request);

		const builder = this.createTypeOrmQueryBuilder();

		builder.select([
			'player.id',
			'player.name',
			'player.email',
			'player.nationality',
			'player.salary',
		]);
		builder.where(where);
		builder.addOrderByColumnCase('name', sortName, sortOrder);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		const { data, count } = await builder.executeGetManyAndCount();

		return {
			data: ClassTransformer.entitiesToModels(data, Player),
			count,
		};
	}

	protected entitySchema(): GenericEntityClassOrSchema<PlayerEntity> {
		return PlayerEntity;
	}
}
