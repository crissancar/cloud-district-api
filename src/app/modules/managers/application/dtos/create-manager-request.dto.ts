import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO31661Alpha2, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { managerPropertiesSwagger } from '../../infrastructure/swagger/properties/manager-properties.swagger';

const { name, email, nationality } = managerPropertiesSwagger;

export class CreateManagerRequest {
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
