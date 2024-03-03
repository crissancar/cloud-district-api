import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiCustomBadRequestResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from '../../../../shared/infrastructure/swagger/decorators/api-custom-unauthorized-response.decorator';
import { sharedConfigSwagger } from '../../../../shared/infrastructure/swagger/shared-config.swagger';
import { clubsConfig } from '../../../clubs.config';

const { swagger } = clubsConfig;
const { security } = sharedConfigSwagger;

export const UpdateClubBudgetSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.updateBudget.operation),
		ApiSecurity(security.apiKey),
		ApiOkResponse(swagger.updateBudget.response.ok),
		ApiCustomBadRequestResponse(swagger.updateBudget.response.badRequest),
		ApiCustomUnauthorizedResponse(swagger.updateBudget.response.unauthorized),
	);
