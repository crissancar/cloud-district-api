import { CriteriaResult } from '../../../shared/application/interfaces/criteria-result.interface';
import { Nullable } from '../../../shared/domain/types/nullable.type';
import { AssociatePlayerWithClubRequest } from '../../application/dtos/associate-player-with-club-request.dto';
import { DisassociatePlayerFromClubRequest } from '../../application/dtos/disassociate-player-with-club-request.dto';
import { FindPlayersByCriteriaRequest } from '../../application/dtos/find-players-by-criteria-request.dto';
import { Player } from '../models/player.model';

export interface PlayerRepository {
	associateWithClub(id: string, request: AssociatePlayerWithClubRequest): Promise<void>;
	create(player: Player): Promise<void>;
	disassociateFromClub(id: string, request: DisassociatePlayerFromClubRequest): Promise<void>;
	findAllByClub(clubId: string): Promise<Array<Player>>;
	findByCriteria(request: FindPlayersByCriteriaRequest): Promise<CriteriaResult<Player>>;
	findById(id: string): Promise<Nullable<Player>>;
}
