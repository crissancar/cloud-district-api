import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateClubRequest } from '../../../../../../src/app/modules/clubs/application/dtos/create-club-request.dto';
import { Club } from '../../../../../../src/app/modules/clubs/domain/models/club.model';
import { TypeOrmEnvironmentArranger } from '../../../../../config/typeorm/typeorm-environment-arranger';
import { ClubHelper } from '../../../shared/helpers/club.helper';
import { ApiKeyStorage } from '../../../shared/storages/api-key.storage';
import { AppStorage } from '../../../shared/storages/app.storage';
import { CreateClubRequestMother } from '../../application/dtos/create-club-request-mother.dto';
import { UpdateClubBudgetRequestMother } from '../../application/dtos/update-club-budget-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let club: Club;
let createClubRequest: CreateClubRequest;

describe('ClubPutController', () => {
	it('should update a valid club budget', async () => {
		const url = `/clubs/${club.id}`;

		const body = UpdateClubBudgetRequestMother.random();

		_request = request(app.getHttpServer())
			.put(url)
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
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
