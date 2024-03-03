import { INestApplication } from '@nestjs/common';

import { ManagerRepository } from '../../../../../../src/app/modules/managers/domain/repositories/manager.repository';
import { managersConfig } from '../../../../../../src/app/modules/managers/managers.config';
import { TypeOrmEnvironmentArranger } from '../../../../../config/typeorm/typeorm-environment-arranger';
import { ClubHelper } from '../../../shared/helpers/club.helper';
import { ManagerHelper } from '../../../shared/helpers/manager.helper';
import { NumberMother } from '../../../shared/mothers/number.mother';
import { AppStorage } from '../../../shared/storages/app.storage';
import { AssociateManagerWithClubRequestMother } from '../../application/dtos/associate-manager-with-club-request-mother.dto';
import { DisassociateManagerFromClubRequestMother } from '../../application/dtos/disassociate-manager-with-club-request-mother.dto';
import { ManagerMother } from '../../domain/models/manager.mother';

const { repositoryInterface } = managersConfig.repository;

let app: INestApplication;
let repository: ManagerRepository;

describe('ManagerRepository', () => {
	it('#associateWithClub', async () => {
		const manager = await ManagerHelper.createRandom();
		const salary = NumberMother.random().toFixed(2);
		const club = await ClubHelper.createRandom();
		const request = AssociateManagerWithClubRequestMother.create(club.id, salary);

		await repository.associateWithClub(manager.id, request);
	});

	it('#create', async () => {
		const manager = ManagerMother.random();

		await repository.create(manager);
	});

	it('#disassociateWithClub', async () => {
		const manager = await ManagerHelper.createRandom();
		const request = DisassociateManagerFromClubRequestMother.create();

		await repository.disassociateFromClub(manager.id, request);
	});

	it('#findAllByClub', async () => {
		const club = await ClubHelper.createRandom();

		await repository.findAllByClub(club.id);
	});

	it('#findById', async () => {
		const manager = await ManagerHelper.createRandom();

		await repository.findById(manager.id);
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
