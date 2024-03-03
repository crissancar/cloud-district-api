import { Nullable } from '../../../shared/domain/types/nullable.type';
import { AssociateManagerWithClubRequest } from '../../application/dtos/associate-manager-with-club-request.dto';
import { DisassociateManagerFromClubRequest } from '../../application/dtos/disassociate-manager-from-club-request.dto';
import { Manager } from '../models/manager.model';

export interface ManagerRepository {
	associateWithClub(id: string, request: AssociateManagerWithClubRequest): Promise<void>;
	create(Manager: Manager): Promise<void>;
	disassociateFromClub(id: string, request: DisassociateManagerFromClubRequest): Promise<void>;
	findAllByClub(clubId: string): Promise<Array<Manager>>;
	findById(id: string): Promise<Nullable<Manager>>;
}
