import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
	origin: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'Content-Language'],
	exposedHeaders: ['x-provider', 'take', 'page', 'count', 'X-Response-Time'],
};
