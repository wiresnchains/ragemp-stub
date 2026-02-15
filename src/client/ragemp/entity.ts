import { isHandler, isNumber, isVector3, Vector3, type ForEachHandler } from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from '@/interfaces/entity';

export class RageEntity<T extends EntityMp = EntityMp> implements Entity {
    public entity: T;

    public constructor(entity: T) {
        this.entity = entity;
    }

    public get id(): number {
        return this.entity.id;
    }

    public get remoteId(): number {
        return this.entity.remoteId;
    }

    public get handle(): number {
        return this.entity.handle;
    }

    public get alpha(): number {
        return this.entity.alpha;
    }

    public set alpha(alpha: number) {
        this.entity.alpha = alpha;
    }

    public get dimension(): number {
        return this.entity.dimension;
    }

    public set dimension(dimension: number) {
        this.entity.dimension = dimension;
    }

    public get model(): number {
        return this.entity.model;
    }

    public set model(model: number) {
        this.entity.model = model;
    }

    public get position(): Vector3 {
        const position = this.entity.position;
        return new Vector3(position.x, position.y, position.z);
    }

    public set position(position: Vector3) {
        this.entity.position = new mp.Vector3(position.x, position.y, position.z);
    }

    public get rotation(): Vector3 {
        const rotation = this.entity.rotation;
        return new Vector3(rotation.x, rotation.y, rotation.z);
    }

    public set rotation(rotation: Vector3) {
        this.entity.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z);
    }

    public get visible(): boolean {
        return this.entity.isVisible();
    }

    public set visible(visible: boolean) {
        this.entity.setVisible(visible, false);
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

    public get streamedEntities(): TAbstraction[] {
        return this.pool.streamed.map(this.getAbstractEntity);
    }

    public get maxStreamedEntityCount(): number {
        return this.pool.maxStreamed;
    }

    public set maxStreamedEntityCount(maxStreamedEntityCount: number) {
        this.pool.maxStreamed = maxStreamedEntityCount;
    }

    public findById(id: number): TAbstraction | undefined {
        const entity = this.pool.at(id);
        if (!entity) {
            return;
        }

        return this.getAbstractEntity(entity);
    }

    public findByRemoteId(remoteId: number): TAbstraction | undefined {
        const entity = this.pool.atRemoteId(remoteId);
        if (!entity) {
            return;
        }

        return this.getAbstractEntity(entity);
    }

    public findByHandle(handle: number): TAbstraction | undefined {
        const entity = this.pool.atHandle(handle);
        if (!entity) {
            return;
        }

        return this.getAbstractEntity(entity);
    }

    public exists(entity: TAbstraction): boolean;
    public exists(entityId: number): boolean;
    public exists(p1: unknown): boolean {
        const isAbstraction = (v: unknown): v is TAbstraction => typeof v === 'object';

        if (isNumber(p1)) {
            return this.pool.exists(p1);
        }

        if (isAbstraction(p1)) {
            return this.pool.exists(p1.entity);
        }

        throw new TypeError('Invalid `exists` overload');
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
        }

        throw new TypeError('Invalid `forEach` overload');
    }

    public toArray(): TAbstraction[] {
        return this.pool.toArray().map(this.getAbstractEntity);
    }
}
