import { Injectable } from '@nestjs/common';

import { UpdateClubBudgetRequest } from '../../../../../src/app/modules/clubs/application/dtos/update-club-budget-request.dto';
import { CreateClubFailedException } from '../../../../../src/app/modules/clubs/domain/exceptions/create-club-failed.exception';
import { UpdateClubBudgetFailedException } from '../../../../../src/app/modules/clubs/domain/exceptions/update-club-budget-failed.exception';
import { Club } from '../../../../../src/app/modules/clubs/domain/models/club.model';
import { ClubRepository } from '../../../../../src/app/modules/clubs/domain/repositories/club.repository';
import { ClubEntity } from '../../../../../src/app/modules/clubs/infrastructure/persistence/club.entity';
import { Nullable } from '../../../../../src/app/modules/shared/domain/types/nullable.type';

const context = 'ClubRepositoryMock';

@Injectable()
export class ClubRepositoryMock implements ClubRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();

	async create(club: Club): Promise<void> {
		this.mockSave(club);

		await Promise.resolve(club);
	}

	async findById(id: string): Promise<Nullable<Club>> {
		return Promise.resolve(this.mockSearch(id));
	}

	async updateBudget(id: string, request: UpdateClubBudgetRequest): Promise<void> {
		const updatedClub = { id, ...request } as ClubEntity;

		this.mockSave(updatedClub);

		await Promise.resolve(updatedClub);
	}

	assertLastSavedClubIs(expectedClub: Club): void {
		const mock = this.mockSave.mock;

		const lastSavedClub = mock.calls[mock.calls.length - 1][0] as Club;

		expect(lastSavedClub.id).toEqual(expectedClub.id);
	}

	whenSearchThenReturn(value: Nullable<Club>): void {
		this.mockSearch.mockReturnValue(value);
	}

	assertLastSearchedClubIs(value: string): void {
		expect(this.mockSearch).toHaveBeenCalledWith(value);
	}

	mockSaveThrowCreateClubFailedException(): void {
		this.mockSave.mockImplementation(() => {
			throw new CreateClubFailedException(context);
		});
	}
}
