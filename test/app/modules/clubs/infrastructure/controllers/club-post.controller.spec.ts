import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateClubRequest } from '../../../../../../src/app/modules/clubs/application/dtos/create-club-request.dto';
import { Club } from '../../../../../../src/app/modules/clubs/domain/models/club.model';
import { CreateManagerRequest } from '../../../../../../src/app/modules/managers/application/dtos/create-manager-request.dto';
import { Manager } from '../../../../../../src/app/modules/managers/domain/models/manager.model';
import { CreatePlayerRequest } from '../../../../../../src/app/modules/players/application/dtos/create-player-request.dto';
import { Player } from '../../../../../../src/app/modules/players/domain/models/player.model';
import { TypeOrmEnvironmentArranger } from '../../../../../config/typeorm/typeorm-environment-arranger';
import { CreateManagerRequestMother } from '../../../managers/application/dtos/create-manager-request-mother.dto';
import { CreatePlayerRequestMother } from '../../../players/application/dtos/create-player-request-mother.dto';
import { ClubHelper } from '../../../shared/helpers/club.helper';
import { ClubManager, ClubManagerHelper } from '../../../shared/helpers/club-manager.helper';
import { ClubPlayer, ClubPlayerHelper } from '../../../shared/helpers/club-player.helper';
import { ManagerHelper } from '../../../shared/helpers/manager.helper';
import { PlayerHelper } from '../../../shared/helpers/player.helper';
import { ApiKeyStorage } from '../../../shared/storages/api-key.storage';
import { AppStorage } from '../../../shared/storages/app.storage';
import { CreateClubRequestMother } from '../../application/dtos/create-club-request-mother.dto';
import { ReleaseClubPlayerRequestMother } from '../../application/dtos/release-club-player-request-mother.dto';
import { SignClubManagerRequestMother } from '../../application/dtos/sign-club-manager-request-mother.dto';
import { SignClubPlayerRequestMother } from '../../application/dtos/sign-club-player-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let club: Club;
let player: Player;
let manager: Manager;
let signedClubPlayer: ClubPlayer;
let signedClubManager: ClubManager;
let createClubRequest: CreateClubRequest;
let createPlayerRequest: CreatePlayerRequest;
let createManagerRequest: CreateManagerRequest;

describe('ClubPostController', () => {
	it('should create a valid club', async () => {
		const url = '/clubs';

		const body = CreateClubRequestMother.random();

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(201);
	});

	it('should sign a valid club player', async () => {
		const url = `/clubs/${club.id}/players/${player.id}/sign`;

		const body = SignClubPlayerRequestMother.random();

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(200);
	});

	it('should release a valid club player', async () => {
		const { id: clubId } = signedClubPlayer.club;
		const { id: playerId } = signedClubPlayer.player;

		const url = `/clubs/${clubId}/players/${playerId}/release`;

		const body = ReleaseClubPlayerRequestMother.create(clubId, playerId);

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(200);
	});

	it('should sign a valid club manager', async () => {
		const url = `/clubs/${club.id}/managers/${manager.id}/sign`;

		const body = SignClubManagerRequestMother.random();

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(200);
	});

	it('should release a valid club manager', async () => {
		const { id: clubId } = signedClubManager.club;
		const { id: managerId } = signedClubManager.manager;

		const url = `/clubs/${clubId}/managers/${managerId}/release`;

		const body = ReleaseClubPlayerRequestMother.create(clubId, managerId);

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;

	createClubRequest = CreateClubRequestMother.random();
	club = await ClubHelper.create(createClubRequest);

	createPlayerRequest = CreatePlayerRequestMother.random();
	player = await PlayerHelper.create(createPlayerRequest);

	createManagerRequest = CreateManagerRequestMother.random();
	manager = await ManagerHelper.create(createManagerRequest);

	signedClubPlayer = await ClubPlayerHelper.sign();
	signedClubManager = await ClubManagerHelper.sign();
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
