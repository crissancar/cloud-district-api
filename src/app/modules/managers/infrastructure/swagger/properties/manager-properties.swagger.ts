import { sharedPropertiesSwagger } from '../../../../shared/infrastructure/swagger/shared-properties.swagger';

export const managerPropertiesSwagger = {
	...sharedPropertiesSwagger,
	name: {
		type: String,
		example: 'Carlo Ancelotti',
		required: true,
	},
	email: {
		type: String,
		example: 'carloancelotti@gmail.com',
		required: true,
	},
	nationality: {
		type: String,
		example: 'IT',
		required: true,
	},
	salary: {
		type: String,
		example: '100000',
		required: true,
	},
};
