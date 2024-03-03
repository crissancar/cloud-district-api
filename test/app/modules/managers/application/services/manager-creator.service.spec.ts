import { ManagerCreator } from '../../../../../../src/app/modules/managers/application/services/manager-creator.service';
import { CreateManagerFailedException } from '../../../../../../src/app/modules/managers/domain/exceptions/create-manager-failed.exception';
import { managersConfig } from '../../../../../../src/app/modules/managers/managers.config';
import { AppUnitTestingModule } from '../../../../../config/unit-testing/app-unit-testing-module';
import { ManagerRepositoryMock } from '../../__mocks__/manager-repository.mock';
import { ManagerMother } from '../../domain/models/manager.mother';
import { CreateManagerRequestMother } from '../dtos/create-manager-request-mother.dto';

const { repositoryInterface } = managersConfig.repository;

let creator: ManagerCreator;
let repository: ManagerRepositoryMock;

describe('ManagerCreator', () => {
	it('should create a valid manager', async () => {
		const request = CreateManagerRequestMother.random();
		const expectedManager = ManagerMother.fromRequest(request);

		await creator.run(request);

		repository.assertLastSavedManagerIs(expectedManager);
	});

	it('should throw CreateManagerFailedException', async () => {
		const request = CreateManagerRequestMother.random();

		repository.mockSaveThrowCreateManagerFailedException();

		await expect(creator.run(request)).rejects.toThrow(CreateManagerFailedException);
	});
});

beforeAll(async () => {
	const testingModule = await AppUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	creator = testingModule.get(ManagerCreator);
});
