import { sharedPropertiesSwagger } from '../../../../shared/infrastructure/swagger/shared-properties.swagger';
import { sharedParamsSwagger } from './../../../../shared/infrastructure/swagger/shared-params.swagger';

export const clubPropertiesSwagger = {
	...sharedPropertiesSwagger,
	...sharedParamsSwagger,
	name: {
		type: String,
		example: 'Atlético Madrid',
		required: true,
	},
	nameParam: {
		name: 'name',
		description: 'Exactly player name to search',
		type: String,
		example: 'Kilian Mbappe',
		required: false,
	},
	budget: {
		type: String,
		example: '1000000',
		required: true,
	},
	salary: {
		type: String,
		example: '200987',
		required: true,
	},
	deletedMessage: {
		type: String,
		example: 'Example with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> deleted',
		required: true,
	},
	softDeletedMessage: {
		type: String,
		example: 'Example with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> soft deleted',
		required: true,
	},
};
