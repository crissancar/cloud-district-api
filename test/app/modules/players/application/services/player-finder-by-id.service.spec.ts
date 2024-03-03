import { PlayerFinderById } from '../../../../../../src/app/modules/players/application/services/player-finder-by-id.service';
import { PlayerWithIdNotExistsException } from '../../../../../../src/app/modules/players/domain/exceptions/player-with-id-not-exists.exception';
import { playersConfig } from '../../../../../../src/app/modules/players/players.config';
import { AppUnitTestingModule } from '../../../../../config/unit-testing/app-unit-testing-module';
import { PlayerRepositoryMock } from '../../__mocks__/player-repository.mock';
import { PlayerMother } from '../../domain/models/player.mother';
import { FindPlayerByIdRequestMother } from '../dtos/find-player-by-id-request-mother.dto';

const { repositoryInterface } = playersConfig.repository;

let finder: PlayerFinderById;
let repository: PlayerRepositoryMock;

describe('PlayerFinderById', () => {
	it('should find a valid manager', async () => {
		const expectedPlayer = PlayerMother.random();

		repository.whenSearchThenReturn(expectedPlayer);

		const request = FindPlayerByIdRequestMother.create(expectedPlayer.id);
		await finder.run(request);

		repository.assertLastSearchedPlayerIs(expectedPlayer.id);
	});

	it('should throw PlayerWithIdNotExistsException', async () => {
		repository.whenSearchThenReturn(null);

		const request = FindPlayerByIdRequestMother.random();

		await expect(finder.run(request)).rejects.toThrow(PlayerWithIdNotExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await AppUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(PlayerFinderById);
});
