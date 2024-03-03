import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { apiKeysConfig } from '../../api-keys.config';
import { ApiKeyNotExistsException } from '../../domain/exceptions/api-key-not-exists.exception';
import { ApiKeyRepository } from '../../domain/repositories/api-key.repository';
import { FindApiKeyRequest } from '../dtos/find-api-key.request.dto';
import { FindApiKeyResponse } from '../dtos/find-api-key.response.dto';

const { finder, repository } = apiKeysConfig;
const { repositoryInterface } = repository;
const { context } = finder.constants;

@Injectable()
export class ApiKeyFinder {
	constructor(@Inject(repositoryInterface) private readonly repository: ApiKeyRepository) {}

	async run(request: FindApiKeyRequest): Promise<FindApiKeyResponse> {
		const apiKey = await this.repository.find(request.key);

		if (!apiKey) {
			throw new ApiKeyNotExistsException(context);
		}

		return FindApiKeyResponse.create(apiKey.key, apiKey.audience);
	}
}
