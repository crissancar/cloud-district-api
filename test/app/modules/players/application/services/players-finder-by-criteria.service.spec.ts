import { PlayersFinderByCriteria } from '../../../../../../src/app/modules/players/application/services/players-finder-by-criteria.service';
import { playersConfig } from '../../../../../../src/app/modules/players/players.config';
import { AppUnitTestingModule } from '../../../../../config/unit-testing/app-unit-testing-module';
import { PlayerRepositoryMock } from '../../__mocks__/player-repository.mock';
import { PlayerMother } from '../../domain/models/player.mother';
import { FindPlayersByCriteriaRequestMother } from '../dtos/find-players-by-criteria-request-mother.dto';
import { FindPlayersByCriteriaResponseMother } from '../dtos/find-players-by-criteria-response-mother.dto';

const { repositoryInterface } = playersConfig.repository;

let finder: PlayersFinderByCriteria;
let repository: PlayerRepositoryMock;

describe('PlayersFinderByCriteria', () => {
	it('should find a valid players', async () => {
		const player = PlayerMother.random();
		const expectedPlayers = [player, player, player];

		repository.whenSearchByCriteriaThenReturn(expectedPlayers);

		const expectedResult = FindPlayersByCriteriaResponseMother.fromExpectedPlayers(expectedPlayers);

		const request = FindPlayersByCriteriaRequestMother.fromExpectedPlayers(expectedPlayers);
		const result = await finder.run(request);

		repository.assertResultIsEqual(expectedResult, result);
	});

	it('should return an empty array', async () => {
		const player = PlayerMother.random();
		const expectedPlayers = [player];

		repository.whenSearchByCriteriaThenReturn([]);

		const expectedResult = FindPlayersByCriteriaResponseMother.fromExpectedPlayers([]);

		const request = FindPlayersByCriteriaRequestMother.fromExpectedPlayers(expectedPlayers);
		const result = await finder.run(request);

		repository.assertResultIsEqual(expectedResult, result);
	});
});

beforeAll(async () => {
	const testingModule = await AppUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(PlayersFinderByCriteria);
});
