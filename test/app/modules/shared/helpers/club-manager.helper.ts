import { Club } from '../../../../../src/app/modules/clubs/domain/models/club.model';
import { ClubEntity } from '../../../../../src/app/modules/clubs/infrastructure/persistence/club.entity';
import { Manager } from '../../../../../src/app/modules/managers/domain/models/manager.model';
import { ManagerEntity } from '../../../../../src/app/modules/managers/infrastructure/persistence/manager.entity';
import { ClubMother } from '../../clubs/domain/models/club.mother';
import { ManagerMother } from '../../managers/domain/models/manager.mother';
import { NumberMother } from '../mothers/number.mother';
import { DataSourceStorage } from '../storages/data-source.storage';

export interface ClubManager {
	club: Club;
	manager: Manager;
}

export class ClubManagerHelper {
	static async sign(): Promise<ClubManager> {
		const club = await this.createClub();

		const createdManager = await this.createManager();

		const manager = await ClubManagerHelper.signClubManager(createdManager, club.id);

		return { club, manager };
	}

	private static async createClub(): Promise<ClubEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ClubEntity);

		const club = ClubMother.random();

		return repository.save(club);
	}

	private static async createManager(): Promise<ManagerEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ManagerEntity);

		const manager = ManagerMother.random();

		return repository.save(manager);
	}

	private static async signClubManager(
		manager: ManagerEntity,
		clubId: string,
	): Promise<ManagerEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ManagerEntity);

		const salary = NumberMother.random(100000, 10000000).toFixed(2);

		const entity = repository.merge(manager, { clubId, salary });

		return repository.save(entity);
	}
}
