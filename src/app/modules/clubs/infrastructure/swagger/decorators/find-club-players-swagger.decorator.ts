import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/infrastructure/swagger/shared-config.swagger';
import { clubsConfig } from '../../../clubs.config';

const { swagger } = clubsConfig;
const { security } = sharedConfigSwagger;

export const FindClubPlayersSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findPlayers.operation),
		ApiSecurity(security.apiKey),
		ApiOkResponse(swagger.findPlayers.response.ok),
		ApiParam(swagger.findPlayers.params.clubId),
		ApiCustomBadRequestResponse(swagger.findPlayers.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.findPlayers.response.unauthorized),
	);
