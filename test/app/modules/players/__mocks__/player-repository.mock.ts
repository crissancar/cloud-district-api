import { Injectable } from '@nestjs/common';

import { AssociatePlayerWithClubRequest } from '../../../../../src/app/modules/players/application/dtos/associate-player-with-club-request.dto';
import { DisassociatePlayerFromClubRequest } from '../../../../../src/app/modules/players/application/dtos/disassociate-player-with-club-request.dto';
import { FindPlayersByCriteriaRequest } from '../../../../../src/app/modules/players/application/dtos/find-players-by-criteria-request.dto';
import { CreatePlayerFailedException } from '../../../../../src/app/modules/players/domain/exceptions/create-player-failed.exception';
import { Player } from '../../../../../src/app/modules/players/domain/models/player.model';
import { PlayerRepository } from '../../../../../src/app/modules/players/domain/repositories/player.repository';
import { PlayerCriteriaQuery } from '../../../../../src/app/modules/players/infrastructure/persistence/player-criteria.query';
import { CriteriaResult } from '../../../../../src/app/modules/shared/application/interfaces/criteria-result.interface';
import { Nullable } from '../../../../../src/app/modules/shared/domain/types/nullable.type';

const context = 'PlayerRepositoryMock';

@Injectable()
export class PlayerRepositoryMock implements PlayerRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();
	private readonly mockMatching = jest.fn();
	private players: Array<Player> = [];

	async associateWithClub(id: string, request: AssociatePlayerWithClubRequest): Promise<void> {
		await Promise.resolve();
	}

	async create(player: Player): Promise<void> {
		this.mockSave(player);

		await Promise.resolve(player);
	}

	async disassociateFromClub(
		id: string,
		request: DisassociatePlayerFromClubRequest,
	): Promise<void> {
		await Promise.resolve();
	}

	async findAllByClub(clubId: string): Promise<Array<Player>> {
		return Promise.resolve([]);
	}

	async findByCriteria(request: FindPlayersByCriteriaRequest): Promise<CriteriaResult<Player>> {
		const query = PlayerCriteriaQuery.create(request);

		this.mockMatching(query);

		const data = this.players;
		const count = this.players.length;

		return Promise.resolve({ data, count });
	}

	async findById(id: string): Promise<Player> {
		return Promise.resolve(this.mockSearch(id));
	}

	assertLastSavedPlayerIs(expectedPlayer: Player): void {
		const mock = this.mockSave.mock;

		const lastSavedPlayer = mock.calls[mock.calls.length - 1][0] as Player;

		expect(lastSavedPlayer.id).toEqual(expectedPlayer.id);
	}

	whenSearchThenReturn(value: Nullable<Player>): void {
		this.mockSearch.mockReturnValue(value);
	}

	whenSearchByCriteriaThenReturn(values: Array<Player>): void {
		this.players = values;

		this.mockMatching.mockReturnValue(values);
	}

	assertLastSearchedPlayerIs(value: string): void {
		expect(this.mockSearch).toHaveBeenCalledWith(value);
	}

	assertResultIsEqual<T>(expectedResult: T, result: T): void {
		expect(expectedResult).toEqual(result);
	}

	mockSaveThrowCreatePlayerFailedException(): void {
		this.mockSave.mockImplementation(() => {
			throw new CreatePlayerFailedException(context);
		});
	}
}
