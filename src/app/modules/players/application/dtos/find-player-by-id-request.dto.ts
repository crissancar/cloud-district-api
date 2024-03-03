import { IsNotEmpty, IsString } from 'class-validator';

export class FindPlayerByIdRequest {
	@IsNotEmpty()
	@IsString()
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): FindPlayerByIdRequest {
		return new FindPlayerByIdRequest(id);
	}
}
