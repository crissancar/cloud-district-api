import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { TypeOrmError } from '../../../shared/application/services/typeorm-error.service';
import { CreateManagerFailedException } from '../../domain/exceptions/create-manager-failed.exception';
import { ManagerAlreadyExistsException } from '../../domain/exceptions/manager-already-exists.exception';
import { Manager } from '../../domain/models/manager.model';
import { ManagerRepository } from '../../domain/repositories/manager.repository';
import { managersConfig } from '../../managers.config';
import { CreateManagerRequest } from '../dtos/create-manager-request.dto';

const { creator, repository } = managersConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ManagerCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: ManagerRepository) {}

	async run(request: CreateManagerRequest): Promise<void> {
		const Manager = this.createManagerInstance(request);

		try {
			await this.repository.create(Manager);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new ManagerAlreadyExistsException(context);
			}
			logger.error(error);
			throw new CreateManagerFailedException(context);
		}
	}

	private createManagerInstance(request: CreateManagerRequest): Manager {
		const { id, name, email, nationality } = request;

		return Manager.create(id, name, email, nationality);
	}
}
