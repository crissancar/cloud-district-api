import { TimestampEntity } from '../../infrastructure/persistence/timestamp.entity';

export type SortColumn<T> = keyof T | keyof TimestampEntity;
