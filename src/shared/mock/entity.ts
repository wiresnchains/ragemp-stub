import type { ForEachHandler, SharedEntity, SharedEntityPool } from '../interfaces/entity';
import { joaat } from '../utils/joaat';
import { isHandler, isNumber, isVector3 } from '../utils/type-resolver';
import { Vector3 } from '../utils/vector';

export class SharedMockEntity<TContainer> implements SharedEntity {
    public readonly id: number;

    public alpha: number;
    public dimension: number;
    public model: number;
    public position: Vector3;

    public isDestroyed: boolean;

    protected container: TContainer;

    public constructor(container: TContainer, id: number) {
        this.container = container;
        this.id = id;
        this.alpha = 255;
        this.dimension = 0;
        this.model = joaat('mp_m_freemode_01');
        this.position = new Vector3(0, 73, 0);
        this.isDestroyed = false;
    }

    public dist(to: Vector3): number {
        return Math.sqrt(this.distSquared(to));
    }

    public distSquared(to: Vector3): number {
        const dx = this.position.x - to.x;
        const dy = this.position.y - to.y;
        const dz = this.position.z - to.z;

        return dx * dx + dy * dy + dz * dz;
    }

    public destroy(): void {
        this.isDestroyed = true;
    }
}

export class SharedMockEntityPool<
    TContainer,
    TEntity extends SharedMockEntity<TContainer> = SharedMockEntity<TContainer>,
> implements SharedEntityPool<TEntity> {
    protected container: TContainer;

    protected entities: Map<number, TEntity>;

    private nextId: number;
    private entityCtor: (container: TContainer, id: number) => TEntity;

    public constructor(container: TContainer, entityCtor: (container: TContainer, id: number) => TEntity) {
        this.nextId = 0;
        this.entities = new Map();
        this.container = container;
        this.entityCtor = entityCtor;
    }

    public createEntity(): TEntity {
        const id = this.nextId;
        this.nextId++;

        const entity = this.entityCtor(this.container, id);
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
    public forEach(p1: unknown, p2?: unknown, p3?: unknown, p4?: unknown): void {
        if (isHandler(p1)) {
            this.forEachAll(p1);
            return;
        }

        if (isNumber(p1) && isHandler(p2)) {
            this.forEachInDimension(p1, p2);
            return;
        }

        if (!isVector3(p1)) {
            throw new TypeError('Expected Vector3 for `position`');
        }

        if (isNumber(p2) && isHandler(p3)) {
            this.forEachInRange(p1, p2, p3);
            return;
        }

        if (isNumber(p2) && isNumber(p3) && isHandler(p4)) {
            this.forEachInDimensionInRange(p1, p2, p3, p4);
            return;
        }

        throw new TypeError('Invalid forEach overload');
    }

    public toArray(): TEntity[] {
        return Array.from(this.entities.values());
    }

    private forEachAll(handler: ForEachHandler<TEntity>): void {
        this.entities.forEach(handler);
    }

    private forEachInDimension(dimension: number, handler: ForEachHandler<TEntity>): void {
        this.entities.forEach(entity => {
            if (entity.dimension !== dimension) {
                return;
            }

            handler(entity);
        });
    }

    private forEachInRange(position: Vector3, range: number, handler: ForEachHandler<TEntity>): void {
        const rangeSquared = range * range;

        this.entities.forEach(entity => {
            if (entity.distSquared(position) > rangeSquared) {
                return;
            }

            handler(entity);
        });
    }

    private forEachInDimensionInRange(
        position: Vector3,
        range: number,
        dimension: number,
        handler: ForEachHandler<TEntity>
    ): void {
        const rangeSquared = range * range;

        this.entities.forEach(entity => {
            if (entity.dimension !== dimension || entity.distSquared(position) > rangeSquared) {
                return;
            }

            handler(entity);
        });
    }
}
