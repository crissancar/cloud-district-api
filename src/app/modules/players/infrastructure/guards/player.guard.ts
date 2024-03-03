import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { PlayerFinderById } from '../../application/services/player-finder-by-id.service';

@Injectable()
export class PlayerGuard implements CanActivate {
	constructor(private readonly finder: PlayerFinderById) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const id = request.params.playerId;

		request.player = await this.finder.run({ id });

		return true;
	}
}
