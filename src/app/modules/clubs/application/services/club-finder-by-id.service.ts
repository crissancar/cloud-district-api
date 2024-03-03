import { Inject, Injectable } from '@nestjs/common';

import { clubsConfig } from '../../clubs.config';
import { ClubWithIdNotExistsException } from '../../domain/exceptions/club-with-id-not-exists.exception';
import { Club } from '../../domain/models/club.model';
import { ClubRepository } from '../../domain/repositories/club.repository';
import { FindClubByIdRequest } from '../dtos/find-club-request.dto';

const { repository, finderById } = clubsConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class ClubFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: ClubRepository) {}

	async run(request: FindClubByIdRequest): Promise<Club> {
		const foundClub = await this.repository.findById(request.clubId);

		if (!foundClub) {
			throw new ClubWithIdNotExistsException(context, request.clubId);
		}

		return foundClub;
	}
}
