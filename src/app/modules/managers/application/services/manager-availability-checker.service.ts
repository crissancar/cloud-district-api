import { Injectable } from '@nestjs/common';

import { ManagerAlreadySignedException } from '../../domain/exceptions/manager-already-signed.exception';
import { managersConfig } from '../../managers.config';
import { CheckManagerAvailabilityRequest } from '../dtos/check-manager-availability-request.dto';
import { FindManagerByIdRequest } from '../dtos/find-manager-by-id-request.dto';
import { ManagerFinderById } from './manager-finder-by-id.service';

const { availabilityChecker } = managersConfig;
const { context } = availabilityChecker.constants;

@Injectable()
export class ManagerAvailabilityChecker {
	constructor(private readonly finder: ManagerFinderById) {}

	async run(request: CheckManagerAvailabilityRequest): Promise<void> {
		const clubId = await this.getManagerClubId(request.id);

		if (clubId) {
			throw new ManagerAlreadySignedException(context);
		}
	}

	private async getManagerClubId(id: string): Promise<string> {
		const request = FindManagerByIdRequest.create(id);
		const { clubId } = await this.finder.run(request);

		return clubId;
	}
}
