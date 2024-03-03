import { Inject, Injectable } from '@nestjs/common';

import { ManagerWithIdNotExistsException } from '../../domain/exceptions/manager-with-id-not-exists.exception';
import { Manager } from '../../domain/models/manager.model';
import { ManagerRepository } from '../../domain/repositories/manager.repository';
import { managersConfig } from '../../managers.config';
import { FindManagerByIdRequest } from '../dtos/find-manager-by-id-request.dto';

const { repository, finderById } = managersConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class ManagerFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: ManagerRepository) {}

	async run(request: FindManagerByIdRequest): Promise<Manager> {
		const foundManager = await this.repository.findById(request.id);

		if (!foundManager) {
			throw new ManagerWithIdNotExistsException(context, request.id);
		}

		return foundManager;
	}
}
