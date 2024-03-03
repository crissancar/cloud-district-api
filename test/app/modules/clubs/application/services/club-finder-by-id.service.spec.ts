import { ClubFinderById } from '../../../../../../src/app/modules/clubs/application/services/club-finder-by-id.service';
import { clubsConfig } from '../../../../../../src/app/modules/clubs/clubs.config';
import { ClubWithIdNotExistsException } from '../../../../../../src/app/modules/clubs/domain/exceptions/club-with-id-not-exists.exception';
import { AppUnitTestingModule } from '../../../../../config/unit-testing/app-unit-testing-module';
import { ClubRepositoryMock } from '../../__mocks__/club-repository.mock';
import { ClubMother } from '../../domain/models/club.mother';
import { FindClubByIdRequestMother } from '../dtos/find-club-by-id-request-mother.dto';

const { repositoryInterface } = clubsConfig.repository;

let finder: ClubFinderById;
let repository: ClubRepositoryMock;

describe('ClubFinderById', () => {
	it('should find a valid club', async () => {
		const expectedClub = ClubMother.random();

		repository.whenSearchThenReturn(expectedClub);

		const request = FindClubByIdRequestMother.create(expectedClub.id);
		await finder.run(request);

		repository.assertLastSearchedClubIs(expectedClub.id);
	});

	it('should throw ClubWithIdNotExistsException', async () => {
		repository.whenSearchThenReturn(null);

		const request = FindClubByIdRequestMother.random();

		await expect(finder.run(request)).rejects.toThrow(ClubWithIdNotExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await AppUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(ClubFinderById);
});
