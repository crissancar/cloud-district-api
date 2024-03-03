import { Club } from '../../../../../src/app/modules/clubs/domain/models/club.model';
import { ClubEntity } from '../../../../../src/app/modules/clubs/infrastructure/persistence/club.entity';
import { Player } from '../../../../../src/app/modules/players/domain/models/player.model';
import { PlayerEntity } from '../../../../../src/app/modules/players/infrastructure/persistence/player.entity';
import { ClubMother } from '../../clubs/domain/models/club.mother';
import { PlayerMother } from '../../players/domain/models/player.mother';
import { NumberMother } from '../mothers/number.mother';
import { DataSourceStorage } from '../storages/data-source.storage';

export interface ClubPlayer {
	club: Club;
	player: Player;
}

export class ClubPlayerHelper {
	static async sign(): Promise<ClubPlayer> {
		const club = await this.createClub();

		const createdPlayer = await this.createPlayer();

		const player = await ClubPlayerHelper.signClubPlayer(createdPlayer, club.id);

		return { club, player };
	}

	private static async createClub(): Promise<ClubEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ClubEntity);

		const club = ClubMother.random();

		return repository.save(club);
	}

	private static async createPlayer(): Promise<PlayerEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(PlayerEntity);

		const player = PlayerMother.random();

		return repository.save(player);
	}

	private static async signClubPlayer(player: PlayerEntity, clubId: string): Promise<PlayerEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(PlayerEntity);

		const salary = NumberMother.random(100000, 10000000).toFixed(2);

		const entity = repository.merge(player, { clubId, salary });

		return repository.save(entity);
	}
}
