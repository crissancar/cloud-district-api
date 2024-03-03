import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO31661Alpha2, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { playerPropertiesSwagger } from '../../infrastructure/swagger/properties/player-properties.swagger';

const { name, email, nationality } = playerPropertiesSwagger;

export class CreatePlayerRequest {
	@IsOptional()
	readonly id: string;

	@ApiProperty(name)
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@ApiProperty(email)
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@ApiProperty(nationality)
	@IsNotEmpty()
	@IsISO31661Alpha2()
	readonly nationality: string;
}
