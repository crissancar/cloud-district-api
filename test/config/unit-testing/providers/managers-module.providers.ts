import { Provider } from '@nestjs/common';

import { ManagerAvailabilityChecker } from '../../../../src/app/modules/managers/application/services/manager-availability-checker.service';
import { ManagerClubAssociator } from '../../../../src/app/modules/managers/application/services/manager-club-associator.service';
import { ManagerClubDisassociator } from '../../../../src/app/modules/managers/application/services/manager-club-disassociator.service';
import { ManagerCreator } from '../../../../src/app/modules/managers/application/services/manager-creator.service';
import { ManagerFinderById } from '../../../../src/app/modules/managers/application/services/manager-finder-by-id.service';
import { ManagerReleasedFromClubMailSender } from '../../../../src/app/modules/managers/application/services/manager-released-from-club-mail-sender.service';
import { ManagerSignedWithClubMailSender } from '../../../../src/app/modules/managers/application/services/manager-signed-with-club-mail-sender.service';
import { ManagersFinderByClub } from '../../../../src/app/modules/managers/application/services/managers-finder-by-club.service';
import { SendgridManagerMailer } from '../../../../src/app/modules/managers/infrastructure/mailers/sendgrid-manager.mailer';
import { managersConfig } from '../../../../src/app/modules/managers/managers.config';
import { ManagerRepositoryMock } from '../../../app/modules/managers/__mocks__/manager-repository.mock';

const { repositoryInterface } = managersConfig.repository;
const { mailerInterface } = managersConfig.mailer;

export const managersModuleProviders: Array<Provider> = [
	ManagerAvailabilityChecker,
	ManagerClubAssociator,
	ManagerClubDisassociator,
	ManagerCreator,
	ManagerFinderById,
	ManagerReleasedFromClubMailSender,
	ManagerSignedWithClubMailSender,
	ManagersFinderByClub,
	{ provide: repositoryInterface, useClass: ManagerRepositoryMock },
	{ provide: mailerInterface, useClass: SendgridManagerMailer },
];
