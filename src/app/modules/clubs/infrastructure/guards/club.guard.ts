import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ClubFinderById } from '../../application/services/club-finder-by-id.service';

@Injectable()
export class ClubGuard implements CanActivate {
	constructor(private readonly finder: ClubFinderById) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const clubId = request.params.clubId;

		request.club = await this.finder.run({ clubId });

		return true;
	}
}
