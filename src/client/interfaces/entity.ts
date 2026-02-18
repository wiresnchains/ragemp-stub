import type { SharedEntity, SharedEntityPool, Vector3 } from 'ragemp-atlas/shared';

export interface Entity extends SharedEntity {
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
     * Rotation in the 3D world.
     */
    rotation: Vector3;

    /**
     * Velocity of the entity.
     */
    velocity: Vector3;

    /**
     * Whether or not the model of the entity is visible.
     */
    visible: boolean;
}

export interface EntityPool<TEntity extends Entity = Entity> extends SharedEntityPool<TEntity> {
    /**
     * An array of all entities that are currently streamed to the client.
     */
    readonly streamedEntities: TEntity[];

    /**
     * Maximum count of the entities that can be streamed to the client.
     */
    maxStreamedEntityCount: number;

    /**
     * Find an entity using the entity handle.
     * @param remoteId The remote identifier of the entity.
     */
    findByRemoteId(remoteId: number): TEntity | undefined;

    /**
     * Find an entity using the entity handle.
     * @param handle The handle of the entity.
     */
    findByHandle(handle: number): TEntity | undefined;

    /**
     * Checks whether or not the given entity exists in the pool.
     * @param entity Target entity.
     */
    exists(entity: TEntity): boolean;

    /**
     * Checks whether or not the given entity exists in the pool.
     * @param entityId The unique identifier of the entity.
     */
    exists(entityId: number): boolean;
}
