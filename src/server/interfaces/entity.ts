import type { SharedEntity, SharedEntityPool } from 'ragemp-atlas/shared';

export interface Entity extends SharedEntity {}

export interface EntityPool<TEntity extends Entity = Entity> extends SharedEntityPool<TEntity> {}
