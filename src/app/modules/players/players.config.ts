import { config } from '../../../config/app';
import { SendgridFrom } from '../shared/infrastructure/mailers/dtos/sendgrid-send-mail-request.dto';
import { playersSwaggerConfig } from './infrastructure/swagger/players-swagger.config';

const { fromEmail, fromName, templates } = config.sendgrid;
const { playerSignedWithClub, playerReleasedFromClub } = templates;

export const playersConfig = {
	entity: { name: 'player' },
	globalRoute: 'players',
	swagger: playersSwaggerConfig,
	repository: {
		repositoryInterface: 'PlayerRepository',
	},
	mailer: {
		mailerInterface: 'PlayerMailer',
	},
	postController: {
		constants: {
			className: 'PlayerPostController',
		},
		logs: {
			requestLog: 'Request received to create a new player',
		},
	},
	creator: {
		constants: {
			context: 'PlayerCreator',
		},
	},
	availabilityChecker: {
		constants: {
			context: 'PlayerAvailabilityChecker',
		},
	},
	finderById: {
		constants: {
			context: 'PlayerFinderById',
		},
	},
	clubAssociator: {
		constants: {
			context: 'PlayerClubAssociator',
		},
		logs: {
			responseLog: (id: string, clubId: string): string =>
				`Player <${id}> associated with club <${clubId}>`,
		},
	},
	clubDisassociator: {
		constants: {
			context: 'PlayerClubDisassociator',
		},
		logs: {
			responseLog: (id: string, clubId: string): string =>
				`Player <${id}> disassociated from club <${clubId}>`,
		},
	},
	signedWithClubMailSender: {
		constants: {
			context: 'PlayerSignedWithClubMailSender',
		},
	},
	releasedFromClubMailSender: {
		constants: {
			context: 'PlayerSignedWithCLubMailSender',
		},
	},
	sendgridMailer: {
		constants: {
			context: 'SendgridPlayerCreatedMailer',
			from: { name: fromName, email: fromEmail } as SendgridFrom,
		},
		logs: {
			signedWithClub: {
				requestLog: 'Sending player signed with club mail',
			},
			releasedFromClub: {
				requestLog: 'Sending player released from club mail',
			},
		},
		templates: {
			signedWithClubTemplate: {
				templateId: playerSignedWithClub,
			},
			releasedFromClubTemplate: {
				templateId: playerReleasedFromClub,
			},
		},
	},
};
