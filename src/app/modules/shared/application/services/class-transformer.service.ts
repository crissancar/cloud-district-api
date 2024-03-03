import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ClassTransformer {
	static entityToModel<Entity, Model>(entity: Entity, model: ClassConstructor<Model>): Model {
		return plainToInstance(model, entity);
	}

	static modelToEntity<Model, Entity>(model: Model, entity: ClassConstructor<Entity>): Entity {
		return plainToInstance(entity, model);
	}

	static entitiesToModels<Entity, Model>(
		entity: Array<Entity>,
		model: ClassConstructor<Model>,
	): Array<Model> {
		return plainToInstance(model, entity);
	}

	static modelsToEntities<Model, Entity>(
		model: Array<Model>,
		entity: ClassConstructor<Entity>,
	): Array<Entity> {
		return plainToInstance(entity, model);
	}
}
