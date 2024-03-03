import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/infrastructure/swagger/shared-config.swagger';
import { playersConfig } from '../../../players.config';

const { swagger } = playersConfig;
const { security } = sharedConfigSwagger;

export const CreatePlayerSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.create.operation),
		ApiSecurity(security.apiKey),
		ApiBody(swagger.create.body),
		ApiResponse(swagger.create.response.created),
		ApiResponse(swagger.create.response.badRequest),
	);
