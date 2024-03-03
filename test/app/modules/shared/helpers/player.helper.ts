import { CreatePlayerRequest } from '../../../../../src/app/modules/players/application/dtos/create-player-request.dto';
import { PlayerCreator } from '../../../../../src/app/modules/players/application/services/player-creator.service';
import { Player } from '../../../../../src/app/modules/players/domain/models/player.model';
import { PlayerEntity } from '../../../../../src/app/modules/players/infrastructure/persistence/player.entity';
import { CreatePlayerRequestMother } from '../../players/application/dtos/create-player-request-mother.dto';
import { AppStorage } from '../storages/app.storage';
import { DataSourceStorage } from '../storages/data-source.storage';

export class PlayerHelper {
	static async create(request: CreatePlayerRequest): Promise<Player> {
		const creator = AppStorage.app.get(PlayerCreator);

		await creator.run(request);

		return this.findById(request.id);
	}

	static async createRandom(): Promise<Player> {
		const creator = AppStorage.app.get(PlayerCreator);

		const request = CreatePlayerRequestMother.random();

		await creator.run(request);

		return this.findById(request.id);
	}

	static async findRandom(): Promise<Player> {
		const repository = DataSourceStorage.dataSource.getRepository(Player);

		const users = await repository.find();

		const randomIndex = Math.floor(Math.random() * users.length);

		return users[randomIndex];
	}

	static async findById(id: string): Promise<PlayerEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(PlayerEntity);

		return repository.findOne({ where: { id } });
	}
}
