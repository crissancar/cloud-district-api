import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../config/logger/logger.config';
import { CorrelationIdMiddleware } from '../config/middlewares/correlation-id.middleware';
import { typeOrmConfig } from '../config/orm/typeorm.config';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { ClubsModule } from './modules/clubs/clubs.module';
import { ManagersModule } from './modules/managers/managers.module';
import { PlayersModule } from './modules/players/players.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		LoggerModule.forRoot(loggerConfig),
		// EventEmitterModule.forRoot({ wildcard: true }),
		EventEmitterModule.forRoot(),
		ApiKeysModule,
		ApiKeysModule,
		ClubsModule,
		ManagersModule,
		PlayersModule,
	],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(CorrelationIdMiddleware).forRoutes('*');
	}
}
