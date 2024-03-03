import { FindOneOptions } from 'typeorm';

import { ClassTransformer } from '../../../shared/application/services/class-transformer.service';
import { GenericEntityClassOrSchema } from '../../../shared/domain/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../shared/domain/types/nullable.type';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm.repository';
import { UpdateClubBudgetRequest } from '../../application/dtos/update-club-budget-request.dto';
import { Club } from '../../domain/models/club.model';
import { ClubRepository } from '../../domain/repositories/club.repository';
import { ClubEntity } from './club.entity';

export class TypeOrmClubRepository extends TypeOrmRepository<ClubEntity> implements ClubRepository {
	async create(club: Club): Promise<void> {
		const entity = ClassTransformer.modelToEntity<Club, ClubEntity>(club, ClubEntity);

		await this.persistEntity(entity);
	}

	async findById(id: string): Promise<Nullable<Club>> {
		const options = { where: { id } } as FindOneOptions<Club>;

		const foundClubEntity = await this.findOneEntity(options);

		return ClassTransformer.entityToModel<ClubEntity, Club>(foundClubEntity, Club);
	}

	async updateBudget(id: string, request: UpdateClubBudgetRequest): Promise<void> {
		await this.persistPartialEntity(id, request);
	}

	protected entitySchema(): GenericEntityClassOrSchema<ClubEntity> {
		return ClubEntity;
	}
}
