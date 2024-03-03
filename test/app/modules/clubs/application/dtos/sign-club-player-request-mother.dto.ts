import { SignClubPlayerRequest } from '../../../../../../src/app/modules/clubs/application/dtos/sign-club-player-request.dto';
import { NumberMother } from '../../../shared/mothers/number.mother';

export class SignClubPlayerRequestMother {
	static create(salary: string): SignClubPlayerRequest {
		return { salary };
	}

	static random(): SignClubPlayerRequest {
		return this.create(NumberMother.random(5000000, 20000000).toFixed(2));
	}
}
