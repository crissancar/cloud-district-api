import { config } from '../../../config/app';
import { SendgridFrom } from '../shared/infrastructure/mailers/dtos/sendgrid-send-mail-request.dto';
import { managersSwaggerConfig } from './infrastructure/swagger/managers-swagger.config';

const { fromEmail, fromName, templates } = config.sendgrid;
const { managerSignedWithClub, managerReleasedFromClub } = templates;

export const managersConfig = {
	entity: { name: 'manager' },
	globalRoute: 'managers',
	swagger: managersSwaggerConfig,
	repository: {
		repositoryInterface: 'ManagerRepository',
	},
	mailer: {
		mailerInterface: 'ManagerMailer',
	},
	postController: {
		constants: {
			className: 'ManagerPostController',
		},
		logs: {
			requestLog: 'Request received to create a new manager',
		},
	},
	creator: {
		constants: {
			context: 'ManagerCreator',
		},
	},
	availabilityChecker: {
		constants: {
			context: 'ManagerAvailabilityChecker',
		},
	},
	finderById: {
		constants: {
			context: 'ManagerFinderById',
		},
	},
	clubAssociator: {
		constants: {
			context: 'ManagerClubAssociator',
		},
		logs: {
			responseLog: (id: string, clubId: string): string =>
				`Manager <${id}> associated with club <${clubId}>`,
		},
	},
	clubDisassociator: {
		constants: {
			context: 'ManagerClubDisassociator',
		},
		logs: {
			responseLog: (id: string, clubId: string): string =>
				`Manager <${id}> disassociated from club <${clubId}>`,
		},
	},
	signedWithClubMailSender: {
		constants: {
			context: 'ManagerSignedWithCLubMailSender',
		},
	},
	releasedFromClubMailSender: {
		constants: {
			context: 'ManagerSignedWithCLubMailSender',
		},
	},
	sendgridMailer: {
		constants: {
			context: 'SendgridManagerCreatedMailer',
			from: { name: fromName, email: fromEmail } as SendgridFrom,
		},
		logs: {
			signedWithClub: {
				requestLog: 'Sending manager signed with club mail',
			},
			releasedFromClub: {
				requestLog: 'Sending manager released from club mail',
			},
		},
		templates: {
			signedWithClubTemplate: {
				templateId: managerSignedWithClub,
			},
			releasedFromClubTemplate: {
				templateId: managerReleasedFromClub,
			},
		},
	},
};
