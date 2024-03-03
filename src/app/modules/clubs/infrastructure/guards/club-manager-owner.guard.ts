import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { Manager } from '../../../managers/domain/models/manager.model';
import { clubsConfig } from '../../clubs.config';
import { ClubIsNotManagerOwnerException } from '../../domain/exceptions/club-is-not-manager-owner.exception';

const { clubManagerOwnerGuard } = clubsConfig;
const { context } = clubManagerOwnerGuard.constants;

@Injectable()
export class ClubManagerOwnerGuard implements CanActivate {
	canActivate(executionContext: ExecutionContext): boolean {
		const request = executionContext.switchToHttp().getRequest<Request>();
		const { managers: clubManagers } = request.club;
		const { id: requestedManagerId } = request.manager;

		if (!this.isClubManager(clubManagers, requestedManagerId)) {
			throw new ClubIsNotManagerOwnerException(context);
		}

		return true;
	}

	private isClubManager(clubManagers: Array<Manager>, requestedManagerId: string): boolean {
		return clubManagers.some((clubManager) => clubManager.id === requestedManagerId);
	}
}
