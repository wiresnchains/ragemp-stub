import type { SharedEntity } from './entity';

export interface SharedPlayer extends SharedEntity {
    /**
     * Heading of the player.
     *
     * Alias for the Z-axis of the rotation.
     */
    heading: number;
}
