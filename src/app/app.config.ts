import { Provider, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ExceptionsFilter } from '../config/filters/exceptions.filter';
import { TransformInterceptor } from '../config/interceptors/transform.interceptor';
import { ValidationException } from './modules/shared/domain/exceptions/validation.exception';

export const providersConfig: Array<Provider> = [
	{
		provide: APP_INTERCEPTOR,
		useFactory: () => new TransformInterceptor(),
	},
	{
		provide: APP_FILTER,
		useFactory: () => new ExceptionsFilter(),
	},
	{
		provide: APP_PIPE,
		useFactory: () =>
			new ValidationPipe({
				exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
				whitelist: true,
				forbidNonWhitelisted: true,
			}),
	},
];
