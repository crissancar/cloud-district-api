import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/infrastructure/swagger/shared-config.swagger';
import { clubsConfig } from '../../../clubs.config';

const { swagger } = clubsConfig;
const { security } = sharedConfigSwagger;

export const ReleaseClubManagerSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.releaseManager.operation),
		ApiSecurity(security.apiKey),
		ApiOkResponse(swagger.releaseManager.response.ok),
		ApiCustomBadRequestResponse(swagger.releaseManager.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.releaseManager.response.unauthorized),
	);
