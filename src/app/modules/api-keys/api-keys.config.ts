export const apiKeysConfig = {
	entity: { name: 'api_key' },
	repository: {
		repositoryInterface: 'ApiKeyRepository',
	},
	authenticator: {
		constants: {
			className: 'ApiKeyAuthenticator',
		},
		logs: {
			requestLog: 'Running api key authenticator',
		},
	},
	finder: {
		constants: {
			context: 'ApiKeyFinder',
		},
	},
};
