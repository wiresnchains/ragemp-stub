import type { Entity, EntityPool } from './entity';

export interface Colshape extends Entity {}

export interface ColshapePool<T extends Colshape = Colshape> extends EntityPool<T> {}
