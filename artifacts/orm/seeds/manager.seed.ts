import { ClassTransformer } from '../../../src/app/modules/shared/application/services/class-transformer.service';
import {Seeder} from '@jorgebodega/typeorm-seeding';
import {DataSource} from 'typeorm';
import { ManagerEntity } from '../../../src/app/modules/managers/infrastructure/persistence/manager.entity';
import { Manager } from '../../../src/app/modules/managers/domain/models/manager.model';

export default class ManagerSeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const entities = ClassTransformer.modelsToEntities(dummieManagers, ManagerEntity)

        try {
            await dataSource.createEntityManager().save<Array<ManagerEntity>>(entities);
        } catch (error) {
          console.log(error)
        }
    }
}

const dummieManagers: Array<Manager> = [
    {
      id: 'e336ef43-f79c-4a72-9c64-2774ba545a7a',
      clubId: '2009b542-5cff-41c5-a636-58e388607e8a',
      name: 'Carlo Ancelotti',
      email: 'carloancelotti@mail.com',
      nationality: 'IT',
      salary: '5000000.00',
    },
    {
      id: 'ca175565-1730-4fac-9129-ce425620f579',
      clubId: '571b00fa-f161-40c8-99fc-5d064c7dda73',
      name: 'Marcelino García',
      email: 'marcelinogarcia@mail.com',
      nationality: 'ES',
      salary: '2000000.00',
    },
  ]
  
