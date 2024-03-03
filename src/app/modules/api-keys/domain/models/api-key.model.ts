import { Timestamp } from '../../../shared/domain/models/timestamp.model';
import { ApiKeyAudiences } from '../enums/api-key-audiences.enum';

export class ApiKey extends Timestamp {
	readonly id: string;

	readonly client: string;

	readonly description: string;

	readonly key: string;

	readonly audience: ApiKeyAudiences;
}
