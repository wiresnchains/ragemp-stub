import type { Vector3 } from 'ragemp-atlas/shared';

export interface Entity {
    /**
     * Unique identifier for the entity.
     */
    readonly id: number;

    /**
     * Transparency of the entity.
     */
    alpha: number;

    /**
     * Dimension of the entity. Entities in the same dimension are streamed to each other.
     */
    dimension: number;

    /**
     * Visible model of the entity.
     */
    model: number;

    /**
     * Position in the 3D world.
     */
    position: Vector3;

    /**
     * Calculate the distance to the given position.
     * @param to Position to which the distance is calculated.
     */
    dist(to: Vector3): number;

    /**
     * Destroys the entity.
     */
    destroy(): void;
}
