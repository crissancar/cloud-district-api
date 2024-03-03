import { CreateManagerRequest } from '../../../../../src/app/modules/managers/application/dtos/create-manager-request.dto';
import { ManagerCreator } from '../../../../../src/app/modules/managers/application/services/manager-creator.service';
import { Manager } from '../../../../../src/app/modules/managers/domain/models/manager.model';
import { ManagerEntity } from '../../../../../src/app/modules/managers/infrastructure/persistence/manager.entity';
import { CreateManagerRequestMother } from '../../managers/application/dtos/create-manager-request-mother.dto';
import { AppStorage } from '../storages/app.storage';
import { DataSourceStorage } from '../storages/data-source.storage';

export class ManagerHelper {
	static async create(request: CreateManagerRequest): Promise<Manager> {
		const creator = AppStorage.app.get(ManagerCreator);

		await creator.run(request);

		return this.findById(request.id);
	}

	static async createRandom(): Promise<Manager> {
		const creator = AppStorage.app.get(ManagerCreator);

		const request = CreateManagerRequestMother.random();

		await creator.run(request);

		return this.findById(request.id);
	}

	static async findRandom(): Promise<Manager> {
		const repository = DataSourceStorage.dataSource.getRepository(Manager);

		const users = await repository.find();

		const randomIndex = Math.floor(Math.random() * users.length);

		return users[randomIndex];
	}

	static async findById(id: string): Promise<ManagerEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ManagerEntity);

		return repository.findOne({ where: { id } });
	}
}
