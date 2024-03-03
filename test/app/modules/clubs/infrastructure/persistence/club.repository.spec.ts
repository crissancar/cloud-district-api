import { INestApplication } from '@nestjs/common';

import { clubsConfig } from '../../../../../../src/app/modules/clubs/clubs.config';
import { ClubRepository } from '../../../../../../src/app/modules/clubs/domain/repositories/club.repository';
import { TypeOrmEnvironmentArranger } from '../../../../../config/typeorm/typeorm-environment-arranger';
import { ClubHelper } from '../../../shared/helpers/club.helper';
import { AppStorage } from '../../../shared/storages/app.storage';
import { UpdateClubBudgetRequestMother } from '../../application/dtos/update-club-budget-request-mother.dto';
import { ClubMother } from '../../domain/models/club.mother';

const { repositoryInterface } = clubsConfig.repository;

let app: INestApplication;
let repository: ClubRepository;

describe('ClubRepository', () => {
	it('#create', async () => {
		const club = ClubMother.random();

		await repository.create(club);
	});

	it('#updateBudget', async () => {
		const club = await ClubHelper.createRandom();
		const request = UpdateClubBudgetRequestMother.random();

		await repository.updateBudget(club.id, request);
	});

	it('#findById', async () => {
		const club = await ClubHelper.createRandom();

		await repository.findById(club.id);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	repository = app.get(repositoryInterface);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
