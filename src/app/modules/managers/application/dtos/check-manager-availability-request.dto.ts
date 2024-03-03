export class CheckManagerAvailabilityRequest {
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): CheckManagerAvailabilityRequest {
		return new CheckManagerAvailabilityRequest(id);
	}
}
