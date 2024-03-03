import { ClassTransformer } from '../../../src/app/modules/shared/application/services/class-transformer.service';
import {Seeder} from '@jorgebodega/typeorm-seeding';
import {DataSource} from 'typeorm';
import { PlayerEntity } from '../../../src/app/modules/players/infrastructure/persistence/player.entity';
import { Player } from '../../../src/app/modules/players/domain/models/player.model';

export default class PlayerSeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const entities = ClassTransformer.modelsToEntities(dummiePlayers, PlayerEntity)

        try {
            await dataSource.createEntityManager().save<Array<PlayerEntity>>(entities);
        } catch (error) {
          console.log(error)
        }
    }
}

const dummiePlayers: Array<Player> = [
    {
      id: 'f2395df1-7965-4922-9ab2-bd4aba5db328',
      clubId: '2009b542-5cff-41c5-a636-58e388607e8a',
      name: 'Vinícius Júnior',
      email: 'viniciusjunior@mail.com',
      nationality: 'BR',
      salary: '15000000.00',
    },
    {
      id: 'ae980647-5fd4-464a-94a0-cc4ff153e68f',
      clubId: '2009b542-5cff-41c5-a636-58e388607e8a',
      name: 'Rodrygo Goes',
      email: 'rodrygogoes@mail.com',
      nationality: 'BR',
      salary: '10000000.00',
    },
    {
      id: '3b2f566c-512f-422a-82ac-27b47d6d9e11',
      clubId: '2009b542-5cff-41c5-a636-58e388607e8a',
      name: 'Jude Bellingham',
      email: 'judebellingham@mail.com',
      nationality: 'GB',
      salary: '18000000.00',
    },
    {
      id: '0af51efa-64b2-4b8a-85e2-835d6bdc4fad',
      clubId: '571b00fa-f161-40c8-99fc-5d064c7dda73',
      name: 'Gerard Moreno',
      email: 'gerardmoreno@mail.com',
      nationality: 'ES',
      salary: '8000000.00',
    },
  ]
  
