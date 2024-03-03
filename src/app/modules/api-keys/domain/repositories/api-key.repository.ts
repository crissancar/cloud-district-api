import { Nullable } from '../../../shared/domain/types/nullable.type';
import { ApiKey } from '../models/api-key.model';

export interface ApiKeyRepository {
	find(key: string): Promise<Nullable<ApiKey>>;
}
