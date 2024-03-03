import { INestApplication } from '@nestjs/common';

import { PlayerRepository } from '../../../../../../src/app/modules/players/domain/repositories/player.repository';
import { playersConfig } from '../../../../../../src/app/modules/players/players.config';
import { TypeOrmEnvironmentArranger } from '../../../../../config/typeorm/typeorm-environment-arranger';
import { ClubHelper } from '../../../shared/helpers/club.helper';
import { PlayerHelper } from '../../../shared/helpers/player.helper';
import { NumberMother } from '../../../shared/mothers/number.mother';
import { AppStorage } from '../../../shared/storages/app.storage';
import { AssociatePlayerWithClubRequestMother } from '../../application/dtos/associate-player-with-club-request-mother.dto';
import { DisassociatePlayerFromClubRequestMother } from '../../application/dtos/disassociate-player-with-club-request-mother.dto';
import { FindPlayersByCriteriaRequestMother } from '../../application/dtos/find-players-by-criteria-request-mother.dto';
import { PlayerMother } from '../../domain/models/player.mother';

const { repositoryInterface } = playersConfig.repository;

let app: INestApplication;
let repository: PlayerRepository;

describe('PlayerRepository', () => {
	it('#associateWithClub', async () => {
		const player = await PlayerHelper.createRandom();
		const salary = NumberMother.random().toFixed(2);
		const club = await ClubHelper.createRandom();
		const request = AssociatePlayerWithClubRequestMother.create(club.id, salary);

		await repository.associateWithClub(player.id, request);
	});

	it('#create', async () => {
		const player = PlayerMother.random();

		await repository.create(player);
	});

	it('#disassociateWithClub', async () => {
		const player = await PlayerHelper.createRandom();
		const request = DisassociatePlayerFromClubRequestMother.create();

		await repository.disassociateFromClub(player.id, request);
	});

	it('#findAllByClub', async () => {
		const club = await ClubHelper.createRandom();

		await repository.findAllByClub(club.id);
	});

	it('#findByCriteria', async () => {
		const club = await ClubHelper.createRandom();
		const request = FindPlayersByCriteriaRequestMother.random(club.id);

		await repository.findByCriteria(request);
	});

	it('#findById', async () => {
		const player = await PlayerHelper.createRandom();

		await repository.findById(player.id);
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
