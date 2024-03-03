import { BinaryLike, CipherCCMTypes, CipherKey, Encoding } from 'crypto';

export const environmentVariablesConfig = {
	crypto: {
		algorithm: null as CipherCCMTypes,
		iv: null as BinaryLike,
		key: null as CipherKey,
		cipher: {
			input: {
				encoding: null as Encoding,
			},
			output: {
				encoding: null as Encoding,
			},
		},
		decipher: {
			input: {
				encoding: null as Encoding,
			},
			output: {
				encoding: null as Encoding,
			},
		},
	},
	env: {
		show: null as boolean,
	},
	logger: {
		level: null as string,
		loki: null as boolean,
	},
	postgres: {
		database: {
			name: null as string,
			host: null as string,
			password: null as string,
			port: null as number,
			username: null as string,
		},
	},
	sendgrid: {
		enabled: null as boolean,
		apiKey: null as string,
		fromName: null as string,
		fromEmail: null as string,
		templates: {
			playerSignedWithClub: null as string,
			playerReleasedFromClub: null as string,
			managerSignedWithClub: null as string,
			managerReleasedFromClub: null as string,
		},
	},
	typeorm: {
		logging: null as boolean,
	},
};
