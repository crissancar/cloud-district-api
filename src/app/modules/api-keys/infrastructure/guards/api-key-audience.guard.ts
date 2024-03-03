import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { InvalidApiKeyAudienceException } from '../../../shared/domain/exceptions/invalid-api-key-audience.exception';
import { apiKeyAudienceGuardConstants } from '../../../shared/infrastructure/config/constants/api-key-audience-guard.constants';
import { ApiKeyAudiences } from '../../domain/enums/api-key-audiences.enum';

const { context } = apiKeyAudienceGuardConstants;

@Injectable()
export class ApiKeyAudienceGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(executionContext: ExecutionContext): boolean {
		const validAudiences = this.reflector.get<Array<string>>(
			'audiences',
			executionContext.getHandler(),
		);

		const apiKeyAudience = this.getApiKeyAudience(executionContext);

		this.checkApiKeyAudience(apiKeyAudience, validAudiences);

		return true;
	}

	private getApiKeyAudience(context: ExecutionContext): ApiKeyAudiences {
		const request = context.switchToHttp().getRequest<Request>();

		const apiKey = request.apiKey;

		return apiKey.audience;
	}

	private checkApiKeyAudience(
		apiKeyAudience: ApiKeyAudiences,
		validAudiences: Array<string>,
	): void {
		if (!this.areValidAudiences(apiKeyAudience, validAudiences)) {
			throw new InvalidApiKeyAudienceException(context);
		}
	}

	private areValidAudiences(
		apiKeyAudience: ApiKeyAudiences,
		validAudiences: Array<string>,
	): boolean {
		return validAudiences.includes(apiKeyAudience);
	}
}
