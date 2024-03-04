import { MotherCreator } from '../services/mother-creator.service';

export class FullNameMother {
	static random(): string {
		return MotherCreator.random().person.fullName();
	}
}
