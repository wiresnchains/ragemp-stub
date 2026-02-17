import type { SharedPlayer } from 'ragemp-atlas/shared';
import type { BasePed } from './ped';
import type { EntityPool } from './entity';

export interface Player extends BasePed, SharedPlayer {}

export interface PlayerPool extends EntityPool<Player> {
    /**
     * The local player instance.
     */
    readonly local: Player;
}
