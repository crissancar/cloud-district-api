import { FindOneOptions } from 'typeorm';

import { ClassTransformer } from '../../../shared/application/services/class-transformer.service';
import { GenericEntityClassOrSchema } from '../../../shared/domain/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../shared/domain/types/nullable.type';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm.repository';
import { ApiKey } from '../../domain/models/api-key.model';
import { ApiKeyRepository } from '../../domain/repositories/api-key.repository';
import { ApiKeyEntity } from './api-key.entity';

export class TypeOrmApiKeyRepository
	extends TypeOrmRepository<ApiKeyEntity>
	implements ApiKeyRepository
{
	async find(key: string): Promise<Nullable<ApiKey>> {
		const options = { where: { key } } as FindOneOptions<ApiKeyEntity>;

		const foundEntity = await this.findOneEntity(options);

		return ClassTransformer.entityToModel(foundEntity, ApiKey);
	}

	protected entitySchema(): GenericEntityClassOrSchema<ApiKeyEntity> {
		return ApiKeyEntity;
	}
}
