import { InjectDataSource } from '@nestjs/typeorm';
import {
	DataSource,
	DeleteResult,
	FindManyOptions,
	FindOneOptions,
	Repository,
	SelectQueryBuilder,
	UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { TypeOrmQueryBuilder } from '../../application/services/typeorm-query-builder.service';
import { GenericEntityClassOrSchema } from '../../domain/types/generic-entity-class-or-schema.type';
import { UpdateNotAffectedAnyRows } from './update-not-affectid-any-rows.exception';

interface QueryBuilder<T> {
	queryBuilder: SelectQueryBuilder<T>;
	alias: string;
}

export abstract class TypeOrmRepository<T> {
	constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

	protected abstract entitySchema(): GenericEntityClassOrSchema<T>;

	protected async persistEntity(data: T): Promise<T> {
		const repository = this.repository();

		return repository.save(data);
	}

	protected async persistPartialEntity(
		id: string,
		partialEntity: QueryDeepPartialEntity<T>,
	): Promise<void> {
		const repository = this.repository();

		const alias = repository.metadata.tableName;

		const { affected } = await repository.update(id, partialEntity);

		if (affected === 0) {
			throw new UpdateNotAffectedAnyRows(alias);
		}
	}

	protected async findOneEntity(options: FindOneOptions<T>): Promise<T> {
		const repository = this.repository();

		return repository.findOne(options);
	}

	protected async findManyEntities(options: FindManyOptions<T>): Promise<Array<T>> {
		const repository = this.repository();

		return repository.find(options);
	}

	protected async deleteEntity(id: string): Promise<DeleteResult> {
		const repository = this.repository();

		return repository.delete(id);
	}

	protected async softDeleteEntity(id: string): Promise<UpdateResult> {
		const repository = this.repository();

		return repository.softDelete(id);
	}

	protected createQueryBuilder(): QueryBuilder<T> {
		const repository = this.repository();

		const alias = repository.metadata.tableName;

		const queryBuilder = repository.createQueryBuilder(alias);

		return { queryBuilder, alias };
	}

	protected createTypeOrmQueryBuilder(): TypeOrmQueryBuilder<T> {
		const repository = this.repository();

		const alias = repository.metadata.tableName;

		const queryBuilder = repository.createQueryBuilder(alias);

		return new TypeOrmQueryBuilder<T>(queryBuilder, alias);
	}

	private repository(): Repository<T> {
		return this.dataSource.getRepository(this.entitySchema());
	}
}
