import { SignClubManagerRequest } from '../../../../../../src/app/modules/clubs/application/dtos/sign-club-manager-request.dto';
import { NumberMother } from '../../../shared/mothers/number.mother';

export class SignClubManagerRequestMother {
	static create(salary: string): SignClubManagerRequest {
		return { salary };
	}

	static random(): SignClubManagerRequest {
		return this.create(NumberMother.random(5000000, 20000000).toFixed(2));
	}
}
