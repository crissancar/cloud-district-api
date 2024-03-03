import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { apiKeyGuardConstants } from '../../../shared/infrastructure/config/constants/api-key-guard.constants';
import { apiKeyGuardLogs } from '../../../shared/infrastructure/config/logs/api-key-guard.logs';
import { InvalidApiKeyException } from '../../domain/exceptions/invalid-api-key.exception';
import { ApiKeyEntity } from '../persistence/api-key.entity';

const { requestLog } = apiKeyGuardLogs;
const { context, passportStrategy } = apiKeyGuardConstants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ApiKeyGuard extends AuthGuard(passportStrategy) {
	// @ts-ignore
	handleRequest(
		error: unknown,
		apiKey: ApiKeyEntity,
		info: unknown,
		executionContext: ExecutionContext,
	): ApiKeyEntity {
		const request = executionContext.switchToHttp().getRequest<Request>();

		if (!apiKey) {
			throw new InvalidApiKeyException(context);
		}

		request.apiKey = apiKey;

		return apiKey;
	}
}
