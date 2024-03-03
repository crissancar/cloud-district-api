import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiKeyAudiences } from '../../../api-keys/domain/enums/api-key-audiences.enum';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { EndpointApiKeyAuthentication } from '../../../shared/infrastructure/decorators/endpoint-api-key-authentication.decorator';
import { UuidGenerator } from '../../../shared/infrastructure/decorators/uuid-generator.decorator';
import { CreatePlayerRequest } from '../../application/dtos/create-player-request.dto';
import { PlayerCreator } from '../../application/services/player-creator.service';
import { playersConfig } from '../../players.config';
import { CreatePlayerSwagger } from '../swagger/decorators/create-player-swagger.decorator';

const { globalRoute, postController } = playersConfig;
const { className } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(className);

@Controller(globalRoute)
export class PlayerPostController {
	constructor(private readonly creator: PlayerCreator) {}

	@CreatePlayerSwagger()
	@EndpointApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async run(@UuidGenerator() id: string, @Body() request: CreatePlayerRequest): Promise<void> {
		logger.log(requestLog);

		return this.creator.run({ ...request, id });
	}
}
