import * as colorette from 'colorette';
import * as process from 'process';

import { LoggerFactory } from '../../app/modules/shared/application/services/logger-factory.service';
import { config } from '../app';

const { api, project, env } = config;

const logger = LoggerFactory.create('');

export class WelcomeLogs {
	static apiUrl = api.url || `http://localhost:${api.port}`;
	static apiVersion = api.version;
	static projectName = project.appName;
	static environment = config.environment;
	static showEnv = env.show;

	static run(): void {
		logger.log(`${this.projectName} magic happens at ${this.apiUrl}/${this.apiVersion}`);
		logger.log(`Environment: ${this.environment}`);
		if (this.showEnv) {
			const skeletonAPIEnv = Object.fromEntries(
				Object.entries(process.env).filter(([key]) => /^SKELETON_API/.test(key)),
			);
			logger.debug({
				message: colorette.yellowBright('Cloud District API environment variables'),
				...skeletonAPIEnv,
			});
		}
	}
}
