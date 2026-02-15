import { joaat, Vector3 } from 'ragemp-atlas/shared';
import type { Entity } from '@/interfaces/entity';

export class MockEntity implements Entity {
    public readonly id: number;
    public readonly remoteId: number;
    public readonly handle: number;

    public alpha: number;
    public dimension: number;
    public model: number;
    public position: Vector3;
    public rotation: Vector3;
    public visible: boolean;

    public isDestroyed: boolean;

    public constructor(id: number, remoteId: number, handle: number) {
        this.id = id;
        this.remoteId = remoteId;
        this.handle = handle;
        this.alpha = 255;
        this.dimension = 0;
        this.model = joaat('mp_m_freemode_01');
        this.position = new Vector3(0, 73);
        this.rotation = new Vector3();
        this.visible = true;
        this.isDestroyed = false;
    }

    public destroy(): void {
        this.isDestroyed = true;
    }
}
