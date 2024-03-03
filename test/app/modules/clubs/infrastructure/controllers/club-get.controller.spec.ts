import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { TypeOrmEnvironmentArranger } from '../../../../../config/typeorm/typeorm-environment-arranger';
import { ClubPlayer, ClubPlayerHelper } from '../../../shared/helpers/club-player.helper';
import { ApiKeyStorage } from '../../../shared/storages/api-key.storage';
import { AppStorage } from '../../../shared/storages/app.storage';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let signedClubPlayer: ClubPlayer;

describe('ClubGetController', () => {
	it('should find a valid club players by criteria', async () => {
		const { id: clubId } = signedClubPlayer.club;
		const { name } = signedClubPlayer.player;

		const url = `/clubs/${clubId}/players?name=${name}&take=0&page=1`;

		_request = request(app.getHttpServer()).get(url).set('Authorization', `ApiKey ${apiKey}`);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;

	signedClubPlayer = await ClubPlayerHelper.sign();
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
