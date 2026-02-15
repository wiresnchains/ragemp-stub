import type { Entity, EntityPool } from './entity';

export interface Player extends Entity {}

export interface PlayerPool<T extends Player = Player> extends EntityPool<T> {}
