import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';

import { ClubEntity } from '../../../clubs/infrastructure/persistence/club.entity';
import { TimestampEntity } from '../../../shared/infrastructure/persistence/timestamp.entity';
import { playersConfig } from '../../players.config';

const { entity } = playersConfig;

@Entity(entity)
export class PlayerEntity extends TimestampEntity {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	nationality: string;

	@Column({ nullable: true })
	salary: string;

	@Column({ nullable: true })
	clubId: string;

	@ManyToOne(() => ClubEntity, (club) => club.players)
	club: Relation<ClubEntity>;
}
