import { MotherCreator } from '../services/mother-creator.service';

export class NationalityMother {
	static random(): string {
		return MotherCreator.random().location.countryCode('alpha-2');
	}
}
