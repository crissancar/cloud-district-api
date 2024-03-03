import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { ApiKeyAudiences } from '../../../api-keys/domain/enums/api-key-audiences.enum';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { EndpointApiKeyAuthentication } from '../../../shared/infrastructure/decorators/endpoint-api-key-authentication.decorator';
import { UuidGenerator } from '../../../shared/infrastructure/decorators/uuid-generator.decorator';
import { CreateClubRequest } from '../../application/dtos/create-club-request.dto';
import { ReleaseClubManagerParams } from '../../application/dtos/release-club-manager-params.dto';
import { ReleaseClubPlayerParams } from '../../application/dtos/release-club-player-params.dto';
import { SignClubManagerParams } from '../../application/dtos/sign-club-manager-params.dto';
import { SignClubManagerRequest } from '../../application/dtos/sign-club-manager-request.dto';
import { SignClubPlayerParams } from '../../application/dtos/sign-club-player-params.dto';
import { SignClubPlayerRequest } from '../../application/dtos/sign-club-player-request.dto';
import { ClubCreator } from '../../application/services/club-creator.service';
import { ClubManagerReleaser } from '../../application/services/club-manager-releaser.service';
import { ClubManagerSigner } from '../../application/services/club-manager-signer.service';
import { ClubPlayerReleaser } from '../../application/services/club-player-releaser.service';
import { ClubPlayerSigner } from '../../application/services/club-player-signer.service';
import { clubsConfig } from '../../clubs.config';
import { EndpointClubManagerAuthentication } from '../decorators/endpoint-club-manager-authentication.decorator';
import { EndpointClubManagerOwnerAuthentication } from '../decorators/endpoint-club-manager-owner-authentication.decorator';
import { EndpointClubPlayerAuthentication } from '../decorators/endpoint-club-player-authentication.decorator';
import { EndpointClubPlayerOwnerAuthentication } from '../decorators/endpoint-club-player-owner-authentication.decorator';
import { CreateClubSwagger } from '../swagger/decorators/create-club-swagger.decorator';
import { ReleaseClubManagerSwagger } from '../swagger/decorators/release-club-manager-swagger.decorator';
import { ReleaseClubPlayerSwagger } from '../swagger/decorators/release-club-player-swagger.decorator';
import { SignClubManagerSwagger } from '../swagger/decorators/sign-club-manager-swagger.decorator';
import { SignClubPlayerSwagger } from '../swagger/decorators/sign-club-player-swagger.decorator';

const { globalRoute, postController } = clubsConfig;
const { className, routes } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(className);

@Controller(globalRoute)
export class ClubPostController {
	constructor(
		private readonly creator: ClubCreator,
		private readonly playerSigner: ClubPlayerSigner,
		private readonly managerSigner: ClubManagerSigner,
		private readonly playerReleaser: ClubPlayerReleaser,
		private readonly managerReleaser: ClubManagerReleaser,
	) {}

	@CreateClubSwagger()
	@EndpointApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@UuidGenerator() id: string, @Body() request: CreateClubRequest): Promise<void> {
		logger.log(requestLog);

		await this.creator.run({ ...request, id });
	}

	@SignClubPlayerSwagger()
	@EndpointClubPlayerAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Post(routes.signClubPlayer)
	async signClubPlayer(
		@Param() params: SignClubPlayerParams,
		@Body() request: SignClubPlayerRequest,
	): Promise<void> {
		logger.log(requestLog);

		await this.playerSigner.run({ ...request, ...params });
	}

	@SignClubManagerSwagger()
	@EndpointClubManagerAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Post(routes.signClubManager)
	async signClubManager(
		@Param() params: SignClubManagerParams,
		@Body() request: SignClubManagerRequest,
	): Promise<void> {
		logger.log(requestLog);

		await this.managerSigner.run({ ...request, ...params });
	}

	@ReleaseClubPlayerSwagger()
	@EndpointClubPlayerOwnerAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Post(routes.releaseClubPlayer)
	async releaseClubPlayer(@Param() params: ReleaseClubPlayerParams): Promise<void> {
		logger.log(requestLog);

		await this.playerReleaser.run({ ...params });
	}

	@ReleaseClubManagerSwagger()
	@EndpointClubManagerOwnerAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Post(routes.releaseClubManager)
	async releaseClubManager(@Param() params: ReleaseClubManagerParams): Promise<void> {
		logger.log(requestLog);

		await this.managerReleaser.run({ ...params });
	}
}
