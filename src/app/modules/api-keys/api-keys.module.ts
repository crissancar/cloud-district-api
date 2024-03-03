import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { apiKeysConfig } from './api-keys.config';
import { ApiKeyAuthenticator } from './application/services/api-key-authenticator.service';
import { ApiKeyFinder } from './application/services/api-key-finder.service';
import { ApiKeyEntity } from './infrastructure/persistence/api-key.entity';
import { TypeOrmApiKeyRepository } from './infrastructure/persistence/typeorm-api-key.repository';
import { ApiKeyStrategy } from './infrastructure/strategies/api-key.strategy';

const { repositoryInterface } = apiKeysConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([ApiKeyEntity])],
	providers: [
		ApiKeyAuthenticator,
		ApiKeyFinder,
		ApiKeyStrategy,
		{ provide: repositoryInterface, useClass: TypeOrmApiKeyRepository },
	],
	exports: [ApiKeyFinder],
})
export class ApiKeysModule {}
