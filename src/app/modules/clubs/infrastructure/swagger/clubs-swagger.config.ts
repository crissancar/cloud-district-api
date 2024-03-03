import { HttpStatus } from '@nestjs/common';

import { ApiResponseExamples } from '../../../shared/infrastructure/swagger/interfaces/api-response-examples.interface';
import { sharedParamsSwagger } from '../../../shared/infrastructure/swagger/shared-params.swagger';
import { sharedResponsesSwagger } from '../../../shared/infrastructure/swagger/shared-responses.swagger';
import { sharedResponsesExamplesSwagger } from '../../../shared/infrastructure/swagger/shared-responses-examples.swagger';
import { CreateClubRequest } from '../../application/dtos/create-club-request.dto';
import { FindClubPlayersByCriteriaResponse } from '../../application/dtos/find-club-players-by-criteria-response.dto';
import { FindClubResponse } from '../../application/dtos/find-club-response.dto';
import { ReleaseClubManagerRequest } from '../../application/dtos/release-club-manager-request.dto';
import { ReleaseClubPlayerRequest } from '../../application/dtos/release-club-player-request.dto';
import { SignClubManagerRequest } from '../../application/dtos/sign-club-manager-request.dto';
import { SignClubPlayerRequest } from '../../application/dtos/sign-club-player-request.dto';

const { unauthorized } = sharedResponsesExamplesSwagger;
const { ok, created } = sharedResponsesSwagger;
const { clubId } = sharedParamsSwagger;

export const clubsSwaggerConfig = {
	tag: 'Clubs',
	description: 'Clubs module endpoints',
	summary: 'Clubs module endpoints',
	create: {
		operation: {
			summary: 'Create club',
		},
		body: { type: CreateClubRequest },
		response: {
			created,
			badRequest: {
				CreateClubFailedException: {
					description: 'API throws an error when attempting to create a club',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Create club failed',
					},
				},
				ClubAlreadyExistsException: {
					description: 'API throws an error because the club already exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Club already exists',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
			},
		},
	},
	findPlayers: {
		operation: {
			summary: 'Find club players by criteria',
		},
		params: {
			clubId,
		},
		response: {
			ok: { ...ok, type: FindClubPlayersByCriteriaResponse },
			badRequest: {
				FindClubPlayersFailedException: {
					description: 'API throws an error when attempting to find a club players',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Find club players failed',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
			},
		},
	},
	updateBudget: {
		operation: {
			summary: 'Update club budget',
		},
		response: {
			ok,
			badRequest: {
				ClubWithIdNotExistsException: {
					description:
						'API throws an error when attempting to update the club budget because not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Club with id <cb478a1gdfgdfa-b81a-4e14-82eb-70bb13084790> not exists',
					},
				},
				UpdateClubBudgetFailedException: {
					description: 'API throws an error when attempting to update the club budget',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Update club budget failed',
					},
				},
				InsufficientClubBudgetException: {
					description:
						'API throws an error when attempting to update the club budget because is insufficient',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Insufficient club budget',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
			},
		},
	},
	signPlayer: {
		operation: {
			summary: 'Sign player',
			description: 'Sign a player with the club',
		},
		body: { type: SignClubPlayerRequest },
		response: {
			ok,
			badRequest: {
				SignClubPlayerFailedException: {
					description: 'API throws an error when attempting to sign a club player',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Sign club player failed',
					},
				},
				PlayerAlreadySignedException: {
					description: 'API throws an error because the player is already signe with one club',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Player is already signed with one club',
					},
				},
				ClubWithIdNotExistsException: {
					description: 'API throws an error because the club not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Club not exists',
					},
				},
				PlayerWithIdNotExistsException: {
					description: 'API throws an error because the player not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Player not exists',
					},
				},
				InsufficientClubBudgetException: {
					description: 'API throws an error because the club budget is insufficient',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Insufficient club budget',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
			},
		},
	},
	signManager: {
		operation: {
			summary: 'Sign manager',
			description: 'Sign a manager with the club',
		},
		body: { type: SignClubManagerRequest },
		response: {
			ok,
			badRequest: {
				SignClubManagerFailedException: {
					description: 'API throws an error when attempting to sign a club manager',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Sign club manager failed',
					},
				},
				ManagerAlreadySignedException: {
					description: 'API throws an error because the manager is already signe with one club',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Manager is already signed with a club',
					},
				},
				ClubWithIdNotExistsException: {
					description: 'API throws an error because the club not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Club not exists',
					},
				},
				ManagerWithIdNotExistsException: {
					description: 'API throws an error because the manager not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Manager not exists',
					},
				},
				InsufficientClubBudgetException: {
					description: 'API throws an error because the club budget is insufficient',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Insufficient club budget',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
			},
		},
	},
	releasePlayer: {
		operation: {
			summary: 'Release player',
			description: 'Release a player with the club',
		},
		body: { type: ReleaseClubPlayerRequest },
		response: {
			ok,
			badRequest: {
				ReleaseClubPlayerFailedException: {
					description: 'API throws an error when attempting to release a club player',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Release club player failed',
					},
				},
				ClubWithIdNotExistsException: {
					description: 'API throws an error because the club not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Club not exists',
					},
				},
				PlayerWithIdNotExistsException: {
					description: 'API throws an error because the player not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Player not exists',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
				ClubIsNotPlayerOwnerException: {
					description: 'Club is not requested player owner',
					value: {
						status: HttpStatus.UNAUTHORIZED,
						message: 'Club is not player owner',
					},
				},
			},
		},
	},
	releaseManager: {
		operation: {
			summary: 'Release manager',
			description: 'Release a manager with the club',
		},
		body: { type: ReleaseClubManagerRequest },
		response: {
			ok,
			badRequest: {
				ReleaseClubManagerFailedException: {
					description: 'API throws an error when attempting to release a club manager',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Release club manager failed',
					},
				},
				ClubWithIdNotExistsException: {
					description: 'API throws an error because the club not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Club not exists',
					},
				},
				ManagerWithIdNotExistsException: {
					description: 'API throws an error because the manager not exists',
					value: {
						status: HttpStatus.BAD_REQUEST,
						message: 'Manager not exists',
					},
				},
			} as ApiResponseExamples,
			unauthorized: {
				...unauthorized.invalidApiKey,
				ClubIsNotManagerOwnerException: {
					description: 'Club is not requested manager owner',
					value: {
						status: HttpStatus.UNAUTHORIZED,
						message: 'Club is not manager owner',
					},
				},
			},
		},
	},
	find: {
		operation: {
			summary: 'Find player',
		},
		response: {
			ok: {
				status: HttpStatus.OK,
				description: 'Ok',
				type: FindClubResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
};
