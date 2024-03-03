import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';

import { ApiKeyAudiences } from '../../../api-keys/domain/enums/api-key-audiences.enum';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { FindClubPlayersByCriteriaParams } from '../../application/dtos/find-club-players-by-criteria-params.dto';
import { FindClubPlayersByCriteriaQuery } from '../../application/dtos/find-club-players-by-criteria-query.dto';
import { FindClubPlayersByCriteriaResponse } from '../../application/dtos/find-club-players-by-criteria-response.dto';
import { ClubPlayersFinderByCriteria } from '../../application/services/club-players-finder-by-criteria.service';
import { clubsConfig } from '../../clubs.config';
import { EndpointClubAuthentication } from '../decorators/endpoint-club-authentication.decorator';
import { FindClubPlayersSwagger } from '../swagger/decorators/find-club-players-swagger.decorator';

const { globalRoute, getController } = clubsConfig;
const { className, routes } = getController.constants;
const { findClubPlayersByCriteria } = getController.logs;

const logger = LoggerFactory.create(className);

@Controller(globalRoute)
export class ClubGetController {
	constructor(private readonly finder: ClubPlayersFinderByCriteria) {}

	@FindClubPlayersSwagger()
	@EndpointClubAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Get(routes.findClubPlayersByCriteria)
	async findClubPlayersByCriteria(
		@Param() params: FindClubPlayersByCriteriaParams,
		@Query() query: FindClubPlayersByCriteriaQuery,
	): Promise<FindClubPlayersByCriteriaResponse> {
		logger.log(findClubPlayersByCriteria.requestLog);

		return this.finder.run({ ...query, ...params });
	}
}
