import { applyDecorators, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from '../../../api-keys/infrastructure/guards/api-key.guard';
import { ApiKeyAudienceGuard } from '../../../api-keys/infrastructure/guards/api-key-audience.guard';
import { AllowedAudiences } from './allowed-audiences.decorator';

export const EndpointApiKeyAuthentication = (...audiences: Array<string>): MethodDecorator =>
	applyDecorators(UseGuards(ApiKeyGuard, ApiKeyAudienceGuard), AllowedAudiences(...audiences));
