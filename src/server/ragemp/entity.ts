import { Vector3 } from 'ragemp-atlas/shared';
import type { Entity } from '../interfaces/entity';

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

    public dist(to: Vector3): number {
        return this.entity.dist(new mp.Vector3(to.x, to.y, to.z));
    }

    public destroy(): void {
        this.entity.destroy();
    }
}
