import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiKeyAudiences } from '../../../api-keys/domain/enums/api-key-audiences.enum';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { EndpointApiKeyAuthentication } from '../../../shared/infrastructure/decorators/endpoint-api-key-authentication.decorator';
import { UuidGenerator } from '../../../shared/infrastructure/decorators/uuid-generator.decorator';
import { CreateManagerRequest } from '../../application/dtos/create-manager-request.dto';
import { ManagerCreator } from '../../application/services/manager-creator.service';
import { managersConfig } from '../../managers.config';
import { CreateManagerSwagger } from '../swagger/decorators/create-manager-swagger.decorator';

const { globalRoute, postController } = managersConfig;
const { className } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(className);

@Controller(globalRoute)
export class ManagerPostController {
	constructor(private readonly creator: ManagerCreator) {}

	@CreateManagerSwagger()
	@EndpointApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async run(@UuidGenerator() id: string, @Body() request: CreateManagerRequest): Promise<void> {
		logger.log(requestLog);

		return this.creator.run({ ...request, id });
	}
}
