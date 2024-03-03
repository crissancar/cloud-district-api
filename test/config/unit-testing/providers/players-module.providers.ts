import { Provider } from '@nestjs/common';

import { PlayerAvailabilityChecker } from '../../../../src/app/modules/players/application/services/player-availability-checker.service';
import { PlayerClubAssociator } from '../../../../src/app/modules/players/application/services/player-club-associator.service';
import { PlayerClubDisassociator } from '../../../../src/app/modules/players/application/services/player-club-disassociator.service';
import { PlayerCreator } from '../../../../src/app/modules/players/application/services/player-creator.service';
import { PlayerFinderById } from '../../../../src/app/modules/players/application/services/player-finder-by-id.service';
import { PlayerReleasedFromClubMailSender } from '../../../../src/app/modules/players/application/services/player-released-from-club-mail-sender.service';
import { PlayerSignedWithClubMailSender } from '../../../../src/app/modules/players/application/services/player-signed-with-club-mail-sender.service';
import { PlayersFinderByClub } from '../../../../src/app/modules/players/application/services/players-finder-by-club.service';
import { PlayersFinderByCriteria } from '../../../../src/app/modules/players/application/services/players-finder-by-criteria.service';
import { SendgridPlayerMailer } from '../../../../src/app/modules/players/infrastructure/mailers/sendgrid-player.mailer';
import { playersConfig } from '../../../../src/app/modules/players/players.config';
import { PlayerRepositoryMock } from '../../../app/modules/players/__mocks__/player-repository.mock';

const { repositoryInterface } = playersConfig.repository;
const { mailerInterface } = playersConfig.mailer;

export const playersModuleProviders: Array<Provider> = [
	PlayerAvailabilityChecker,
	PlayerClubAssociator,
	PlayerClubDisassociator,
	PlayerCreator,
	PlayerFinderById,
	PlayerReleasedFromClubMailSender,
	PlayersFinderByClub,
	PlayersFinderByCriteria,
	PlayerSignedWithClubMailSender,
	{ provide: repositoryInterface, useClass: PlayerRepositoryMock },
	{ provide: mailerInterface, useClass: SendgridPlayerMailer },
];
