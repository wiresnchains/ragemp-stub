import type { SharedEntity, SharedEntityPool } from './entity';

export interface SharedPed extends SharedEntity {}

export interface SharedPedPool extends SharedEntityPool<SharedPed> {}
