import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { TypeOrmEnvironmentArranger } from '../../../../../config/typeorm/typeorm-environment-arranger';
import { ApiKeyStorage } from '../../../shared/storages/api-key.storage';
import { AppStorage } from '../../../shared/storages/app.storage';
import { CreatePlayerRequestMother } from '../../application/dtos/create-player-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;

describe('PlayerPostController', () => {
	it('should create a valid player', async () => {
		const url = '/players';

		const body = CreatePlayerRequestMother.random();

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(201);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
