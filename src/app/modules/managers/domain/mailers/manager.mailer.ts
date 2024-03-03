import { Club } from '../../../clubs/domain/models/club.model';
import { Manager } from '../../../managers/domain/models/manager.model';

export interface ManagerMailer {
	signedWithClub(manager: Manager, club: Club): Promise<void>;
	releasedFromClub(manager: Manager, club: Club): Promise<void>;
}
