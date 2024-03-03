import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/infrastructure/swagger/shared-config.swagger';
import { clubsConfig } from '../../../clubs.config';

const { swagger } = clubsConfig;
const { security } = sharedConfigSwagger;

export const SignClubManagerSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.signManager.operation),
		ApiSecurity(security.apiKey),
		ApiBody(swagger.signManager.body),
		ApiOkResponse(swagger.signManager.response.ok),
		ApiCustomBadRequestResponse(swagger.signManager.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.signManager.response.unauthorized),
	);
