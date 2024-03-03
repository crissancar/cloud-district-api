import { applyDecorators, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from '../../../api-keys/infrastructure/guards/api-key.guard';
import { ApiKeyAudienceGuard } from '../../../api-keys/infrastructure/guards/api-key-audience.guard';
import { ManagerGuard } from '../../../managers/infrastructure/guards/manager.guard';
import { AllowedAudiences } from '../../../shared/infrastructure/decorators/allowed-audiences.decorator';
import { ClubGuard } from '../guards/club.guard';

export const EndpointClubManagerAuthentication = (...audiences: Array<string>): MethodDecorator =>
	applyDecorators(
		UseGuards(ApiKeyGuard, ApiKeyAudienceGuard, ClubGuard, ManagerGuard),
		AllowedAudiences(...audiences),
	);
