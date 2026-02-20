import type { SharedEntity, SharedEntityPool } from 'ragemp-stub/shared';

export interface Entity extends SharedEntity {}

export interface EntityPool<TEntity extends Entity = Entity> extends SharedEntityPool<TEntity> {}
