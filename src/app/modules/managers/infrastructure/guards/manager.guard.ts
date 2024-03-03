import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ManagerFinderById } from '../../application/services/manager-finder-by-id.service';

@Injectable()
export class ManagerGuard implements CanActivate {
	constructor(private readonly finder: ManagerFinderById) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const id = request.params.managerId;

		request.manager = await this.finder.run({ id });

		return true;
	}
}
