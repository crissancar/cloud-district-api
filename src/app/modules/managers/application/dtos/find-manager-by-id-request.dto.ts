import { IsNotEmpty, IsString } from 'class-validator';

export class FindManagerByIdRequest {
	@IsNotEmpty()
	@IsString()
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): FindManagerByIdRequest {
		return new FindManagerByIdRequest(id);
	}
}
