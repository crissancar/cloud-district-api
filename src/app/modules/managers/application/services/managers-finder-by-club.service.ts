import { Inject, Injectable } from '@nestjs/common';

import { Manager } from '../../domain/models/manager.model';
import { ManagerRepository } from '../../domain/repositories/manager.repository';
import { managersConfig } from '../../managers.config';
import { FindManagersByClubRequest } from '../dtos/find-managers-by-club-request.dto';

const { repository } = managersConfig;
const { repositoryInterface } = repository;

@Injectable()
export class ManagersFinderByClub {
	constructor(@Inject(repositoryInterface) private readonly repository: ManagerRepository) {}

	async run(request: FindManagersByClubRequest): Promise<Array<Manager>> {
		return this.repository.findAllByClub(request.clubId);
	}
}
