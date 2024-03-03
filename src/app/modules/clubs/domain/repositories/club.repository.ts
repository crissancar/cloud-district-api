import { Nullable } from '../../../shared/domain/types/nullable.type';
import { UpdateClubBudgetRequest } from '../../application/dtos/update-club-budget-request.dto';
import { Club } from '../models/club.model';

export interface ClubRepository {
	create(club: Club): Promise<void>;
	findById(id: string): Promise<Nullable<Club>>;
	updateBudget(id: string, request: UpdateClubBudgetRequest): Promise<void>;
}
