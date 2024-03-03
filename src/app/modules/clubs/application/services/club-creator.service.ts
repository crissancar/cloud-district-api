import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { TypeOrmError } from '../../../shared/application/services/typeorm-error.service';
import { clubsConfig } from '../../clubs.config';
import { ClubAlreadyExistsException } from '../../domain/exceptions/club-already-exists.exception';
import { CreateClubFailedException } from '../../domain/exceptions/create-club-failed.exception';
import { Club } from '../../domain/models/club.model';
import { ClubRepository } from '../../domain/repositories/club.repository';
import { CreateClubRequest } from '../dtos/create-club-request.dto';

const { creator, repository } = clubsConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ClubCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: ClubRepository) {}

	async run(request: CreateClubRequest): Promise<void> {
		const club = Club.create(request.id, request.name, request.budget);

		try {
			await this.repository.create(club);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new ClubAlreadyExistsException(context);
			}
			logger.error(error);
			throw new CreateClubFailedException(context);
		}
	}
}
