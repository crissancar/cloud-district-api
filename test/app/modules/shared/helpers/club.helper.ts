import { CreateClubRequest } from '../../../../../src/app/modules/clubs/application/dtos/create-club-request.dto';
import { ClubCreator } from '../../../../../src/app/modules/clubs/application/services/club-creator.service';
import { Club } from '../../../../../src/app/modules/clubs/domain/models/club.model';
import { ClubEntity } from '../../../../../src/app/modules/clubs/infrastructure/persistence/club.entity';
import { CreateClubRequestMother } from '../../clubs/application/dtos/create-club-request-mother.dto';
import { AppStorage } from '../storages/app.storage';
import { DataSourceStorage } from '../storages/data-source.storage';

export class ClubHelper {
	static async create(request: CreateClubRequest): Promise<Club> {
		const creator = AppStorage.app.get(ClubCreator);

		await creator.run(request);

		return this.findById(request.id);
	}

	static async createRandom(): Promise<Club> {
		const creator = AppStorage.app.get(ClubCreator);

		const request = CreateClubRequestMother.random();

		await creator.run(request);

		return this.findById(request.id);
	}

	static async findRandom(): Promise<Club> {
		const repository = DataSourceStorage.dataSource.getRepository(Club);

		const users = await repository.find();

		const randomIndex = Math.floor(Math.random() * users.length);

		return users[randomIndex];
	}

	static async findById(id: string): Promise<ClubEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ClubEntity);

		return repository.findOne({ where: { id } });
	}
}
