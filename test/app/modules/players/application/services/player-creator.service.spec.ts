import { PlayerCreator } from '../../../../../../src/app/modules/players/application/services/player-creator.service';
import { CreatePlayerFailedException } from '../../../../../../src/app/modules/players/domain/exceptions/create-player-failed.exception';
import { playersConfig } from '../../../../../../src/app/modules/players/players.config';
import { AppUnitTestingModule } from '../../../../../config/unit-testing/app-unit-testing-module';
import { PlayerRepositoryMock } from '../../__mocks__/player-repository.mock';
import { PlayerMother } from '../../domain/models/player.mother';
import { CreatePlayerRequestMother } from '../dtos/create-player-request-mother.dto';

const { repositoryInterface } = playersConfig.repository;

let creator: PlayerCreator;
let repository: PlayerRepositoryMock;

describe('PlayerCreator', () => {
	it('should create a valid manager', async () => {
		const request = CreatePlayerRequestMother.random();
		const expectedPlayer = PlayerMother.fromRequest(request);

		await creator.run(request);

		repository.assertLastSavedPlayerIs(expectedPlayer);
	});

	it('should throw CreatePlayerFailedException', async () => {
		const request = CreatePlayerRequestMother.random();

		repository.mockSaveThrowCreatePlayerFailedException();

		await expect(creator.run(request)).rejects.toThrow(CreatePlayerFailedException);
	});
});

beforeAll(async () => {
	const testingModule = await AppUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	creator = testingModule.get(PlayerCreator);
});
