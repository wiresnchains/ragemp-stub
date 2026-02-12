import type { Vector3 } from 'ragemp-atlas/shared';
import type { Entity } from './entity';

export type ForEachHandler<T extends Entity> = (entity: T) => void;

export interface EntityPool<T extends Entity> {
    /**
     * Count of total entities in the pool.
     */
    readonly count: number;

    /**
     * The actual size of the pool.
     *
     * Useful for iterating through entities using a loop, since their IDs can have gaps if some entities are destroyed.
     */
    readonly size: number;

    /**
     * Find an entity using the unique identifier.
     * @param id The unique identifier of the entity.
     */
    get(id: number): T | undefined;

    /**
     * Iterate through all entities in the pool.
     * @param handler Function that will be called for each entity.
     */
    forEach(handler: ForEachHandler<T>): void;

    /**
     * Iterate through all entities in a given dimension.
     * @param dimension Target dimension
     * @param handler Function that will be called for each entity.
     */
    forEachInDimension(dimension: number, handler: ForEachHandler<T>): void;

    /**
     * Iterate through all entities in a given range.
     * @param position Center point to check from.
     * @param range Range from the center point.
     * @param handler Function that will be called for each entity.
     */
    forEachInRange(position: Vector3, range: number, handler: ForEachHandler<T>): void;

    /**
     * Iterate through all entities in a given dimension in a given range.
     * @param position Center point to check from.
     * @param range Range from the center point.
     * @param dimension Target dimension
     * @param handler Function that will be called for each entity.
     */
    forEachInRange(position: Vector3, range: number, dimension: number, handler: ForEachHandler<T>): void;

    /**
     * Converts the pool to an array.
     */
    toArray(): T[];
}
