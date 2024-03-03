import { ClassTransformer } from './../../../src/app/modules/shared/application/services/class-transformer.service';
import { Club } from './../../../src/app/modules/clubs/domain/models/club.model';
import { ClubEntity } from './../../../src/app/modules/clubs/infrastructure/persistence/club.entity';
import {Seeder} from '@jorgebodega/typeorm-seeding';
import {DataSource} from 'typeorm';

export default class ClubSeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const entities = ClassTransformer.modelsToEntities(dummieClubs, ClubEntity)

        try {
            await dataSource.createEntityManager().save<Array<ClubEntity>>(entities);
        } catch (error) {
            console.log(error);
        }
    }
}

const dummieClubs: Array<Club> = [
    {
      id: '2009b542-5cff-41c5-a636-58e388607e8a',
      name: 'Real Madrid CF',
      budget: '100000000.00',
    },
    {
      id: '571b00fa-f161-40c8-99fc-5d064c7dda73',
      name: 'Villarreal CF',
      budget: '20000000.00'
    }
  ]
  
