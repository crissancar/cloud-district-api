import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';

import { clubsModuleProviders } from './providers/clubs-module.providers';
import { managersModuleProviders } from './providers/managers-module.providers';
import { playersModuleProviders } from './providers/players-module.providers';

export class AppUnitTestingModule {
	static async create(): Promise<TestingModule> {
		const testingModule = await Test.createTestingModule({
			imports: [EventEmitterModule.forRoot()],
			providers: [...clubsModuleProviders, ...managersModuleProviders, ...playersModuleProviders],
		}).compile();

		testingModule.createNestApplication({ logger: false });

		return testingModule;
	}
}
