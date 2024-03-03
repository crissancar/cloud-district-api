import { Manager } from '../../../managers/domain/models/manager.model';
import { Player } from '../../../players/domain/models/player.model';
import { Timestamp } from '../../../shared/domain/models/timestamp.model';

export class Club extends Timestamp {
	readonly id: string;

	readonly name: string;

	readonly budget: string;

	readonly players?: Array<Player>;

	readonly managers?: Array<Manager>;

	constructor(id: string, name: string, budget: string) {
		super();
		this.id = id;
		this.name = name;
		this.budget = budget;
	}

	static create(id: string, name: string, budget: string): Club {
		return new Club(id, name, budget);
	}
}
