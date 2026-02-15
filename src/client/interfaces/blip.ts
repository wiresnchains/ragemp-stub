import type { Entity, EntityPool } from './entity';

export interface Blip extends Entity {}

export interface BlipPool<T extends Blip = Blip> extends EntityPool<T> {}
