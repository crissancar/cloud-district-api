import * as dotenv from 'dotenv';

import { LoggerFactory } from '../../../src/app/modules/shared/application/services/logger-factory.service';

const logger = LoggerFactory.create('Jest setup');

dotenv.config({ path: '.env.test' });

if (!process.env.CLOUD_DISTRICT_api_port) {
	logger.error('Environment error, the file ".env.test" exists?');

	process.exit(1);
}
