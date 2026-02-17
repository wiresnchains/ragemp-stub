import type { Entity, EntityPool } from './entity';

export interface BasePed extends Entity {}

export interface Ped extends BasePed {}

export interface PedPool extends EntityPool<Ped> {}
