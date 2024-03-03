import { sharedPropertiesSwagger } from '../../../../shared/infrastructure/swagger/shared-properties.swagger';

export const playerPropertiesSwagger = {
	...sharedPropertiesSwagger,
	name: {
		type: String,
		example: 'Kylian Mbappe',
		required: true,
	},
	email: {
		type: String,
		example: 'kylianmbappe@gmail.com',
		required: true,
	},
	nationality: {
		type: String,
		example: 'FR',
		required: true,
	},
	salary: {
		type: String,
		example: '100000',
		required: true,
	},
	count: {
		type: Number,
		example: 100,
	},
	currentCount: {
		type: Number,
		example: 2,
	},
	take: {
		type: Number,
		example: 2,
	},
	page: {
		type: Number,
		example: 1,
	},
	players: {
		example: [
			{
				id: 'd77b8d13-550c-4579-8f57-dfdda982448b',
				name: 'Kylian Mbappe',
				email: 'kylianmbappe@gmail.com',
				nationality: 'FR',
			},
			{
				id: '6e2f0f00-e23e-4b89-acea-ca5d2cab55a9',
				name: 'Vinicius Jr',
				email: 'viniciusjr@gmail.com',
				nationality: 'BR',
			},
		],
	},
};
