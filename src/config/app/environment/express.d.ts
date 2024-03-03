import { ApiKeyEntity } from '../../../app/modules/api-keys/infrastructure/persistence/api-key.entity';
import { Club } from '../../../app/modules/clubs/domain/models/club.model';
import { Player } from '../../../app/modules/players/domain/models/player.model';

declare global {
	namespace Express {
		interface Request {
			apiKey: ApiKeyEntity;
			club: Club;
			player: Player;
			manager: Manager;
		}
	}
}

export {};
