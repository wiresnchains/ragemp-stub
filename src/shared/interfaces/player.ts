import type { SharedEntityPool } from './entity';
import type { SharedPed } from './ped';

export interface SharedPlayer extends SharedPed {}

export interface SharedPlayerPool extends SharedEntityPool<SharedPlayer> {}
