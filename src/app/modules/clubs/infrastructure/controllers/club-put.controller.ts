import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { ApiKeyAudiences } from '../../../api-keys/domain/enums/api-key-audiences.enum';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { UpdateClubBudgetParams } from '../../application/dtos/update-club-budget-params.dto';
import { UpdateClubBudgetRequest } from '../../application/dtos/update-club-budget-request.dto';
import { ClubBudgetUpdater } from '../../application/services/club-budget-updater.service';
import { clubsConfig } from '../../clubs.config';
import { EndpointClubAuthentication } from '../decorators/endpoint-club-authentication.decorator';
import { UpdateClubBudgetSwagger } from '../swagger/decorators/update-club-budget-swagger.decorator';

const { globalRoute, putController } = clubsConfig;
const { className, routes } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(className);

@Controller(globalRoute)
export class ClubPutController {
	constructor(private readonly budgetUpdater: ClubBudgetUpdater) {}

	@UpdateClubBudgetSwagger()
	@EndpointClubAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Put(routes.updateBudget)
	async updateBudget(
		@Param() params: UpdateClubBudgetParams,
		@Body() request: UpdateClubBudgetRequest,
	): Promise<void> {
		logger.log(requestLog);

		await this.budgetUpdater.run(params.clubId, request);
	}
}
