import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindClubParams {
	@IsNotEmpty()
	@IsUUID()
	readonly clubId: string;
}
