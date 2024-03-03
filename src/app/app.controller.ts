import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { config } from '../config/app';
import { sharedConfigSwagger } from './modules/shared/infrastructure/swagger/shared-config.swagger';

const { project, PWD } = config;
const { security } = sharedConfigSwagger;

const logger = new Logger('AppController');

@Controller()
export class AppController {
	@ApiTags('Welcome')
	@ApiOperation({ summary: 'App welcome' })
	@ApiOkResponse({
		description: 'Welcome message',
	})
	@HttpCode(HttpStatus.OK)
	@Get()
	welcome(): object {
		logger.log(`Welcome to ${project.appName}`);

		return { welcome: project.appName };
	}
}
