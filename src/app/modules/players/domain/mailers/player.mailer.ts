import { Club } from '../../../clubs/domain/models/club.model';
import { Player } from '../models/player.model';

export interface PlayerMailer {
	signedWithClub(player: Player, club: Club): Promise<void>;
	releasedFromClub(player: Player, club: Club): Promise<void>;
}
