import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/infrastructure/swagger/shared-config.swagger';
import { managersConfig } from '../../../managers.config';

const { swagger } = managersConfig;
const { security } = sharedConfigSwagger;

export const CreateManagerSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.create.operation),
		ApiSecurity(security.apiKey),
		ApiBody(swagger.create.body),
		ApiResponse(swagger.create.response.created),
		ApiResponse(swagger.create.response.badRequest),
	);
