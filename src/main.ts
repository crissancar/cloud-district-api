import { RedocModule } from '@jozefazz/nestjs-redoc';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import SendGrid from '@sendgrid/mail';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import responseTime from 'response-time';

import { AppModule } from './app/app.module';
import { config } from './config/app/index';
import { WelcomeLogs } from './config/logger/welcome-logs.config';
import { SwaggerConfig } from './config/swagger/swagger.config';

const { sendgrid, api } = config;

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	// Set Swagger
	if (api.documentation.enabled) {
		await setSwagger(app);
	}

	// Set Sendgrid
	if (sendgrid.enabled) {
		setSendgrid();
	}

	// Set Pino logger
	app.useLogger(app.get(Logger));

	// Set global prefix
	app.setGlobalPrefix(api.version);

	// Set Cors
	app.enableCors();

	// Compress all responses
	app.use(compression());

	// Enable CORS middleware
	app.use(cors(api.cors));

	// Set Helmet
	app.use(helmet(api.helmet));

	// Set Rate Limit
	app.use(rateLimit(api.rateLimit));

	// ResponseTime
	if (api.responseTime) {
		app.use(responseTime());
	}

	// Launch the app
	await app.listen(api.port);

	// Welcome logs
	WelcomeLogs.run();
}

async function setSwagger(app: INestApplication): Promise<void> {
	const config = SwaggerConfig.documentBuilder();

	const document = SwaggerModule.createDocument(app, config);

	const redocOptions = SwaggerConfig.redocOptions();

	await RedocModule.setup('documentation', app, document, redocOptions);

	// const path = SwaggerConfig.path();
	// const customOptions = SwaggerConfig.customOptions();

	// SwaggerModule.setup(path, app, document, customOptions);
}

function setSendgrid(): void {
	SendGrid.setApiKey(sendgrid.apiKey);
}

void bootstrap();
