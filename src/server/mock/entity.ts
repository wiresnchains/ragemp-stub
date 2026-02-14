import type { Entity, EntityPool } from '@/interfaces/entity';
import { joaat, Vector3, type ForEachHandler } from 'ragemp-atlas/shared';

export class MockEntity implements Entity {
    public readonly id: number;

    public alpha: number;
    public dimension: number;
    public model: number;
    public position: Vector3;

    public isDestroyed: boolean;

    public constructor(id: number) {
        this.id = id;
        this.alpha = 255;
        this.dimension = 0;
        this.model = joaat('mp_m_freemode_01');
        this.position = new Vector3(0, 73, 0);
        this.isDestroyed = false;
    }

    public dist(to: Vector3): number {
        const dx = this.position.x - to.x;
        const dy = this.position.y - to.y;
        const dz = this.position.z - to.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    public destroy(): void {
        this.isDestroyed = true;
    }
}

export class MockEntityPool<TEntity extends MockEntity = MockEntity> implements EntityPool<TEntity> {
    private entities: Map<number, TEntity>;
    private nextId: number;
    private entityCtor: (id: number) => TEntity;

    public constructor(entityCtor: (id: number) => TEntity) {
        this.nextId = 0;
        this.entities = new Map();
        this.entityCtor = entityCtor;
    }

    public createEntity(): TEntity {
        const id = this.nextId;
        this.nextId++;

        const entity = this.entityCtor(id);
        this.entities.set(this.nextId, entity);
        return entity;
    }

    public get count(): number {
        return this.entities.size;
    }

    public get size(): number {
        return this.nextId;
    }

    public findById(id: number): TEntity | undefined {
        return this.entities.get(id);
    }

    public forEach(handler: ForEachHandler<TEntity>): void;
    public forEach(dimension: number, handler: ForEachHandler<TEntity>): void;
    public forEach(position: Vector3, range: number, handler: ForEachHandler<TEntity>): void;
    public forEach(position: Vector3, range: number, dimension: number, handler: ForEachHandler<TEntity>): void;
    public forEach(position: unknown, range?: unknown, dimension?: unknown, handler?: unknown): void {}

    public toArray(): TEntity[] {
        return Array.from(this.entities.values());
    }
}
