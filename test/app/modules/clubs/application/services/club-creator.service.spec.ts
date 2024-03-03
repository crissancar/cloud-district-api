import { ClubCreator } from '../../../../../../src/app/modules/clubs/application/services/club-creator.service';
import { clubsConfig } from '../../../../../../src/app/modules/clubs/clubs.config';
import { CreateClubFailedException } from '../../../../../../src/app/modules/clubs/domain/exceptions/create-club-failed.exception';
import { AppUnitTestingModule } from '../../../../../config/unit-testing/app-unit-testing-module';
import { ClubRepositoryMock } from '../../__mocks__/club-repository.mock';
import { ClubMother } from '../../domain/models/club.mother';
import { CreateClubRequestMother } from '../dtos/create-club-request-mother.dto';

const { repositoryInterface } = clubsConfig.repository;

let creator: ClubCreator;
let repository: ClubRepositoryMock;

describe('ClubCreator', () => {
	it('should create a valid club', async () => {
		const request = CreateClubRequestMother.random();
		const expectedClub = ClubMother.fromRequest(request);

		await creator.run(request);

		repository.assertLastSavedClubIs(expectedClub);
	});

	it('should throw CreateClubFailedException', async () => {
		const request = CreateClubRequestMother.random();

		repository.mockSaveThrowCreateClubFailedException();

		await expect(creator.run(request)).rejects.toThrow(CreateClubFailedException);
	});
});

beforeAll(async () => {
	const testingModule = await AppUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	creator = testingModule.get(ClubCreator);
});
