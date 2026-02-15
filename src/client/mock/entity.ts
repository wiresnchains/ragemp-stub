import { isNumber, SharedMockEntity, SharedMockEntityPool, Vector3 } from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from '@/interfaces/entity';
import type { MockContainer } from '@/container';

export class MockEntity extends SharedMockEntity<MockContainer> implements Entity {
    public readonly remoteId: number;
    public readonly handle: number;

    public rotation: Vector3;
    public visible: boolean;

    public constructor(container: MockContainer, id: number, remoteId: number, handle: number) {
        super(container, id);

        this.remoteId = remoteId;
        this.handle = handle;

        this.rotation = new Vector3();
        this.visible = true;
    }
}

export class MockEntityPool<TEntity extends MockEntity = MockEntity>
    extends SharedMockEntityPool<MockContainer, TEntity>
    implements EntityPool<TEntity>
{
    public maxStreamedEntityCount: number;

    private streamedEntitySet: Set<TEntity>;

    public constructor(container: MockContainer, entityCtor: (container: MockContainer, id: number) => TEntity) {
        super(container, entityCtor);

        this.maxStreamedEntityCount = 200;
        this.streamedEntitySet = new Set();
    }

    public get streamedEntities(): TEntity[] {
        return Array.from(this.streamedEntitySet.values());
    }

    public findByRemoteId(remoteId: number): TEntity | undefined {
        let found: TEntity | undefined;

        this.entities.forEach(entity => {
            if (found) {
                return;
            }

            if (entity.remoteId === remoteId) {
                found = entity;
            }
        });

        return found;
    }

    public findByHandle(handle: number): TEntity | undefined {
        let found: TEntity | undefined;

        this.entities.forEach(entity => {
            if (found) {
                return;
            }

            if (entity.handle === handle) {
                found = entity;
            }
        });

        return found;
    }

    public exists(entity: TEntity): boolean;
    public exists(entityId: number): boolean;
    public exists(p1: unknown): boolean {
        const isEntity = (v: unknown): v is TEntity => typeof v === 'object';

        if (isNumber(p1)) {
            return this.entities.has(p1);
        }

        if (isEntity(p1)) {
            return this.entities.has(p1.id);
        }

        throw new TypeError('Invalid `exists` overload');
    }
}
