import { ManagerFinderById } from '../../../../../../src/app/modules/managers/application/services/manager-finder-by-id.service';
import { ManagerWithIdNotExistsException } from '../../../../../../src/app/modules/managers/domain/exceptions/manager-with-id-not-exists.exception';
import { managersConfig } from '../../../../../../src/app/modules/managers/managers.config';
import { AppUnitTestingModule } from '../../../../../config/unit-testing/app-unit-testing-module';
import { ManagerRepositoryMock } from '../../__mocks__/manager-repository.mock';
import { ManagerMother } from '../../domain/models/manager.mother';
import { FindManagerByIdRequestMother } from '../dtos/find-manager-by-id-request-mother.dto';

const { repositoryInterface } = managersConfig.repository;

let finder: ManagerFinderById;
let repository: ManagerRepositoryMock;

describe('ManagerFinderById', () => {
	it('should find a valid manager', async () => {
		const expectedManager = ManagerMother.random();

		repository.whenSearchThenReturn(expectedManager);

		const request = FindManagerByIdRequestMother.create(expectedManager.id);
		await finder.run(request);

		repository.assertLastSearchedManagerIs(expectedManager.id);
	});

	it('should throw ManagerWithIdNotExistsException', async () => {
		repository.whenSearchThenReturn(null);

		const request = FindManagerByIdRequestMother.random();

		await expect(finder.run(request)).rejects.toThrow(ManagerWithIdNotExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await AppUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(ManagerFinderById);
});
