import { isHandler, isNumber, isVector3, Vector3, type ForEachHandler } from 'ragemp-stub/shared';
import type { Entity, EntityPool } from '@/interfaces/entity';

export class RageEntity<T extends EntityMp = EntityMp> implements Entity {
    public entity: T;

    public constructor(entity: T) {
        this.entity = entity;
    }

    public get id() {
        return this.entity.id;
    }

    public get alpha() {
        return this.entity.alpha;
    }

    public set alpha(alpha: number) {
        this.entity.alpha = alpha;
    }

    public get dimension() {
        return this.entity.dimension;
    }

    public set dimension(dimension: number) {
        this.entity.dimension = dimension;
    }

    public get model() {
        return this.entity.model;
    }

    public set model(model: number) {
        this.entity.model = model;
    }

    public get position() {
        return new Vector3(this.entity.position.x, this.entity.position.y, this.entity.position.z);
    }

    public set position(position: Vector3) {
        this.entity.position = new mp.Vector3(position.x, position.y, position.z);
    }

    public get heading(): number {
        //@ts-ignore
        return this.entity.heading;
    }

    public set heading(heading: number) {
        //@ts-ignore
        this.entity.heading = heading;
    }

    public dist(to: Vector3): number {
        return this.entity.dist(new mp.Vector3(to.x, to.y, to.z));
    }

    public distSquared(to: Vector3): number {
        return this.entity.distSquared(new mp.Vector3(to.x, to.y, to.z));
    }

    public destroy(): void {
        this.entity.destroy();
    }
}

export class RageEntityPool<
    TEntity extends EntityMp = EntityMp,
    TPool extends EntityMpPool<TEntity> = EntityMpPool<TEntity>,
    TAbstraction extends RageEntity<TEntity> = RageEntity<TEntity>,
> implements EntityPool<TAbstraction> {
    protected pool: TPool;

    private getAbstractEntity: (entity: TEntity) => TAbstraction;

    public constructor(pool: TPool, getAbstractEntity: (entity: TEntity) => TAbstraction) {
        this.pool = pool;
        this.getAbstractEntity = getAbstractEntity;
    }

    public get count(): number {
        return this.pool.length;
    }

    public get size(): number {
        return this.pool.size;
    }

    public findById(id: number): TAbstraction | undefined {
        const entity = this.pool.at(id);
        if (!entity) {
            return;
        }

        return this.getAbstractEntity(entity);
    }

    public forEach(handler: ForEachHandler<TAbstraction>): void;
    public forEach(dimension: number, handler: ForEachHandler<TAbstraction>): void;
    public forEach(position: Vector3, range: number, handler: ForEachHandler<TAbstraction>): void;
    public forEach(position: Vector3, range: number, dimension: number, handler: ForEachHandler<TAbstraction>): void;
    public forEach(p1: unknown, p2?: unknown, p3?: unknown, p4?: unknown): void {
        if (isHandler(p1)) {
            this.pool.forEach(p1);
            return;
        }

        if (isNumber(p1) && isHandler(p2)) {
            this.pool.forEachInDimension(p1, p2);
            return;
        }

        if (!isVector3(p1)) {
            throw new TypeError('Expected Vector3 for `position`');
        }

        if (isNumber(p2) && isHandler(p3)) {
            this.pool.forEachInRange(new mp.Vector3(p1.x, p1.y, p1.z), p2, p3);
            return;
        }

        if (isNumber(p2) && isNumber(p3) && isHandler(p4)) {
            this.pool.forEachInRange(new mp.Vector3(p1.x, p1.y, p1.z), p2, p3, p4);
            return;
        }

        throw new TypeError('Invalid forEach overload');
    }

    public toArray(): TAbstraction[] {
        return this.pool.toArray().map(this.getAbstractEntity);
    }
}
