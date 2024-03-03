import { Timestamp } from '../../../shared/domain/models/timestamp.model';

export class Player extends Timestamp {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	readonly nationality: string;

	readonly clubId: string;

	readonly salary: string;

	constructor(id: string, name: string, email: string, nationality: string, salary?: string) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.nationality = nationality;
		this.salary = salary;
	}

	static create(id: string, name: string, email: string, nationality: string): Player {
		return new Player(id, name, email, nationality);
	}
}
