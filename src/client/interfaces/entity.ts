import type { ForEachHandler, Vector3 } from 'ragemp-atlas/shared';

export interface Entity {
    /**
     * Unique identifier for the entity.
     *
     * Differs for same entities on different clients.
     */
    readonly id: number;

    /**
     * Unique identifier for the entity.
     *
     * Stays the same on same entities on different clients and the server.
     */
    readonly remoteId: number;

    /**
     * Entity handle.
     */
    readonly handle: number;

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
     * Rotation in the 3D world.
     */
    rotation: Vector3;

    /**
     * Whether or not the model of the entity is visible.
     */
    visible: boolean;

    /**
     * Destroys the entity.
     */
    destroy(): void;
}

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
     * An array of all entities that are currently streamed to the client.
     */
    readonly streamedEntities: T[];

    /**
     * Maximum count of the entities that can be streamed to the client.
     */
    maxStreamedEntityCount: number;

    /**
     * Find an entity using the unique identifier.
     * @param id The unique identifier of the entity.
     */
    findById(id: number): T | undefined;

    /**
     * Find an entity using the entity handle.
     * @param remoteId The remote identifier of the entity.
     */
    findByRemoteId(remoteId: number): T | undefined;

    /**
     * Find an entity using the entity handle.
     * @param handle The handle of the entity.
     */
    findByHandle(handle: number): T | undefined;

    /**
     * Checks whether or not the given entity exists in the pool.
     * @param entity Target entity.
     */
    exists(entity: T): boolean;

    /**
     * Checks whether or not the given entity exists in the pool.
     * @param entityId The unique identifier of the entity.
     */
    exists(entityId: number): boolean;

    /**
     * Iterate through all entities in the pool.
     * @param handler Function that will be called for each entity.
     */
    forEach(handler: ForEachHandler<T>): void;

    /**
     * Iterate through all entities in a given dimension.
     * @param dimension Target dimension.
     * @param handler Function that will be called for each entity.
     */
    forEach(dimension: number, handler: ForEachHandler<T>): void;

    /**
     * Iterate through all entities in a given range.
     * @param position Center point to check from.
     * @param range Range from the center point.
     * @param handler Function that will be called for each entity.
     */
    forEach(position: Vector3, range: number, handler: ForEachHandler<T>): void;

    /**
     * Iterate through all entities in a given range in a given dimension.
     * @param position Center point to check from.
     * @param range Range from the center point.
     * @param dimension Target dimension.
     * @param handler Function that will be called for each entity.
     */
    forEach(position: Vector3, range: number, dimension: number, handler: ForEachHandler<T>): void;

    /**
     * Converts the pool to an array.
     */
    toArray(): T[];
}
