import { FindManyOptions, FindOneOptions } from 'typeorm';

import { ClassTransformer } from '../../../shared/application/services/class-transformer.service';
import { GenericEntityClassOrSchema } from '../../../shared/domain/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../shared/domain/types/nullable.type';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm.repository';
import { AssociateManagerWithClubRequest } from '../../application/dtos/associate-manager-with-club-request.dto';
import { DisassociateManagerFromClubRequest } from '../../application/dtos/disassociate-manager-from-club-request.dto';
import { Manager } from '../../domain/models/manager.model';
import { ManagerRepository } from '../../domain/repositories/manager.repository';
import { ManagerEntity } from './manager.entity';

export class TypeOrmManagerRepository
	extends TypeOrmRepository<ManagerEntity>
	implements ManagerRepository
{
	async associateWithClub(id: string, request: AssociateManagerWithClubRequest): Promise<void> {
		await this.persistPartialEntity(id, request);
	}

	async create(Manager: Manager): Promise<void> {
		const entity = ClassTransformer.modelToEntity(Manager, ManagerEntity);

		await this.persistEntity(entity);
	}

	async disassociateFromClub(
		id: string,
		request: DisassociateManagerFromClubRequest,
	): Promise<void> {
		await this.persistPartialEntity(id, request);
	}

	async findById(id: string): Promise<Nullable<Manager>> {
		const options = { where: { id } } as FindOneOptions<ManagerEntity>;

		const entity = await this.findOneEntity(options);

		return ClassTransformer.entityToModel(entity, Manager);
	}

	async findAllByClub(clubId: string): Promise<Array<Manager>> {
		const options = {
			select: ['id', 'name', 'salary'],
			where: { clubId },
		} as FindManyOptions<ManagerEntity>;

		const foundManagersEntities = await this.findManyEntities(options);

		return ClassTransformer.entitiesToModels(foundManagersEntities, Manager);
	}

	protected entitySchema(): GenericEntityClassOrSchema<ManagerEntity> {
		return ManagerEntity;
	}
}
