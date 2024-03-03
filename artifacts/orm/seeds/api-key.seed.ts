import { ApiKeyAudiences } from './../../../src/app/modules/api-keys/domain/enums/api-key-audiences.enum';
import { ApiKeyEntity } from '../../../src/app/modules/api-keys/infrastructure/persistence/api-key.entity';
import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm";
import { generateApiKey } from 'generate-api-key';
import { Crypto } from '../../../src/app/modules/shared/application/services/crypto.service';

export default class ApiKeySeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const client = 'Cloud District';
        const description = 'Seed generated key';
        const plainKey = '1b9QWbRQpBuEFeOE0sUkK2';
        const key = Crypto.cipher(plainKey);
        const audience = ApiKeyAudiences.GENERAL;

        try {
            const entityManager = await dataSource.createEntityManager();
            
            const foundApiKeys = await entityManager.find<ApiKeyEntity>(ApiKeyEntity);

            if(foundApiKeys.length) {
                return;
            }

            const apiKeyEntity = await entityManager.create<ApiKeyEntity>(ApiKeyEntity, {client, description, key, audience});
            
            await entityManager.save<ApiKeyEntity>(apiKeyEntity);
        } catch (error) {
            console.log(error);
        }
    }
}
