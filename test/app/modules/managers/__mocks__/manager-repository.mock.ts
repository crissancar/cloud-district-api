import { Injectable } from '@nestjs/common';

import { AssociateManagerWithClubRequest } from '../../../../../src/app/modules/managers/application/dtos/associate-manager-with-club-request.dto';
import { DisassociateManagerFromClubRequest } from '../../../../../src/app/modules/managers/application/dtos/disassociate-manager-from-club-request.dto';
import { CreateManagerFailedException } from '../../../../../src/app/modules/managers/domain/exceptions/create-manager-failed.exception';
import { Manager } from '../../../../../src/app/modules/managers/domain/models/manager.model';
import { ManagerRepository } from '../../../../../src/app/modules/managers/domain/repositories/manager.repository';
import { Nullable } from '../../../../../src/app/modules/shared/domain/types/nullable.type';

const context = 'ManagerRepositoryMock';

@Injectable()
export class ManagerRepositoryMock implements ManagerRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();

	async associateWithClub(id: string, request: AssociateManagerWithClubRequest): Promise<void> {
		await Promise.resolve();
	}

	async create(manager: Manager): Promise<void> {
		this.mockSave(manager);

		await Promise.resolve(manager);
	}

	async disassociateFromClub(
		id: string,
		request: DisassociateManagerFromClubRequest,
	): Promise<void> {
		await Promise.resolve();
	}

	async findAllByClub(clubId: string): Promise<Array<Manager>> {
		return Promise.resolve([]);
	}

	async findById(id: string): Promise<Manager> {
		return Promise.resolve(this.mockSearch(id));
	}

	assertLastSavedManagerIs(expectedManager: Manager): void {
		const mock = this.mockSave.mock;

		const lastSavedManager = mock.calls[mock.calls.length - 1][0] as Manager;

		expect(lastSavedManager.id).toEqual(expectedManager.id);
	}

	whenSearchThenReturn(value: Nullable<Manager>): void {
		this.mockSearch.mockReturnValue(value);
	}

	assertLastSearchedManagerIs(value: string): void {
		expect(this.mockSearch).toHaveBeenCalledWith(value);
	}

	mockSaveThrowCreateManagerFailedException(): void {
		this.mockSave.mockImplementation(() => {
			throw new CreateManagerFailedException(context);
		});
	}
}
