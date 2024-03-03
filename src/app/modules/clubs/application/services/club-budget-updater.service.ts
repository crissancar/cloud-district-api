import { Inject, Injectable } from '@nestjs/common';

import { isDomainException } from '../../../shared/application/services/domain-exception-handler.service';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { clubsConfig } from '../../clubs.config';
import { UpdateClubBudgetFailedException } from '../../domain/exceptions/update-club-budget-failed.exception';
import { ClubRepository } from '../../domain/repositories/club.repository';
import { CheckClubFutureBudgetAvailabilityRequest } from '../dtos/check-club-future-budget-availability-request.dto';
import { UpdateClubBudgetRequest } from '../dtos/update-club-budget-request.dto';
import { ClubFutureBudgetAvailabilityChecker } from './club-future-budget-availability-checker.service';

const { repository, budgetUpdater } = clubsConfig;
const { repositoryInterface } = repository;
const { exceptions, context } = budgetUpdater.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ClubBudgetUpdater {
	constructor(
		@Inject(repositoryInterface) private readonly repository: ClubRepository,
		private readonly futureBudgetChecker: ClubFutureBudgetAvailabilityChecker,
	) {}

	async run(id: string, request: UpdateClubBudgetRequest): Promise<void> {
		try {
			await this.checkFutureBudgetAvailability(id, request.budget);

			await this.repository.updateBudget(id, request);
		} catch (error) {
			if (isDomainException(error, exceptions)) {
				throw error;
			}

			logger.error(error);
			throw new UpdateClubBudgetFailedException(context);
		}
	}

	private async checkFutureBudgetAvailability(id: string, budget: string): Promise<void> {
		const request = CheckClubFutureBudgetAvailabilityRequest.create(id, budget);
		await this.futureBudgetChecker.run(request);
	}
}
