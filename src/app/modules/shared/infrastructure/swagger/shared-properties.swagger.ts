export const sharedPropertiesSwagger = {
	id: {
		type: String,
		example: '61f4722b-cfd2-48e8-bd8f-7b8af7c5f285',
	},
	keyword: {
		name: 'keyword',
		description: 'Keyword to search in player name',
		type: String,
		example: 'Kilian',
		required: false,
	},
	take: {
		name: 'take',
		description: 'Number of records to obtain',
		type: Number,
		example: 2,
		required: false,
	},
	count: {
		name: 'count',
		description: 'Number of total records',
		type: Number,
		example: 50,
		required: false,
	},
	currentCount: {
		type: Number,
		example: 2,
		required: false,
	},
	page: {
		name: 'page',
		description: 'Page number of the records list',
		type: Number,
		example: 1,
		required: false,
	},
	sortName: {
		name: 'sortName',
		type: String,
		description: 'Sort the response by player name',
		example: 'Kilian',
		required: false,
	},
	sortColumn: {
		name: 'sortColumn',
		description: 'Sort the response by player property',
		type: String,
		example: 'name',
		required: false,
	},
	sortOrder: {
		name: 'sortOrder',
		description: 'Sort the response by ASC or DESC',
		type: String,
		example: 'ASC',
		required: false,
	},
};