import { Injectable } from '@nestjs/common';

import { PlayerAlreadySignedException } from '../../domain/exceptions/player-already-signed.exception';
import { playersConfig } from '../../players.config';
import { CheckPlayerAvailabilityRequest } from '../dtos/check-player-availability-request.dto';
import { FindPlayerByIdRequest } from '../dtos/find-player-by-id-request.dto';
import { PlayerFinderById } from './player-finder-by-id.service';

const { availabilityChecker } = playersConfig;
const { context } = availabilityChecker.constants;

@Injectable()
export class PlayerAvailabilityChecker {
	constructor(private readonly finder: PlayerFinderById) {}

	async run(request: CheckPlayerAvailabilityRequest): Promise<void> {
		const clubId = await this.getPlayerClubId(request.id);

		if (clubId) {
			throw new PlayerAlreadySignedException(context);
		}
	}

	private async getPlayerClubId(id: string): Promise<string> {
		const request = FindPlayerByIdRequest.create(id);
		const { clubId } = await this.finder.run(request);

		return clubId;
	}
}
