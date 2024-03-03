import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';

import { ManagerEntity } from '../../../managers/infrastructure/persistence/manager.entity';
import { PlayerEntity } from '../../../players/infrastructure/persistence/player.entity';
import { TimestampEntity } from '../../../shared/infrastructure/persistence/timestamp.entity';
import { clubsConfig } from '../../clubs.config';

const { entity } = clubsConfig;

@Entity(entity)
export class ClubEntity extends TimestampEntity {
	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	name: string;

	@Column()
	budget: string;

	@OneToMany(() => PlayerEntity, (player) => player.club, { eager: true })
	players: Relation<Array<PlayerEntity>>;

	@OneToMany(() => ManagerEntity, (manager) => manager.club, { eager: true })
	managers: Relation<Array<ManagerEntity>>;
}
