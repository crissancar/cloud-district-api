export class CheckPlayerAvailabilityRequest {
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): CheckPlayerAvailabilityRequest {
		return new CheckPlayerAvailabilityRequest(id);
	}
}
