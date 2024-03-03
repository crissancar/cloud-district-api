import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/infrastructure/swagger/shared-config.swagger';
import { clubsConfig } from '../../../clubs.config';

const { swagger } = clubsConfig;
const { security } = sharedConfigSwagger;

export const CreateClubSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.create.operation),
		ApiSecurity(security.apiKey),
		ApiBody(swagger.create.body),
		ApiCreatedResponse(swagger.create.response.created),
		ApiCustomBadRequestResponse(swagger.create.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.create.response.unauthorized),
	);
