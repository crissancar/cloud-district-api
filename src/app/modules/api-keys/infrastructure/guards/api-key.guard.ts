import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { apiKeyGuardConstants } from '../../../shared/infrastructure/config/constants/api-key-guard.constants';
import { InvalidApiKeyException } from '../../domain/exceptions/invalid-api-key.exception';
import { ApiKeyEntity } from '../persistence/api-key.entity';

const { context, passportStrategy } = apiKeyGuardConstants;

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
