import { applyDecorators, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from '../../../api-keys/infrastructure/guards/api-key.guard';
import { ApiKeyAudienceGuard } from '../../../api-keys/infrastructure/guards/api-key-audience.guard';
import { PlayerGuard } from '../../../players/infrastructure/guards/player.guard';
import { AllowedAudiences } from '../../../shared/infrastructure/decorators/allowed-audiences.decorator';
import { ClubGuard } from '../guards/club.guard';
import { ClubPlayerOwnerGuard } from '../guards/club-player-owner.guard';

export const EndpointClubPlayerOwnerAuthentication = (
	...audiences: Array<string>
): MethodDecorator =>
	applyDecorators(
		UseGuards(ApiKeyGuard, ApiKeyAudienceGuard, ClubGuard, PlayerGuard, ClubPlayerOwnerGuard),
		AllowedAudiences(...audiences),
	);
