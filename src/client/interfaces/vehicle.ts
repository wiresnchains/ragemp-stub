import type { Entity, EntityPool } from './entity';

export interface Vehicle extends Entity {}

export interface VehiclePool<T extends Vehicle = Vehicle> extends EntityPool<T> {}
