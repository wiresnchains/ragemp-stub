import type { ClientContainer } from '@/interfaces/container';
import { RageEventPool } from '@/ragemp/event';

export class RageClientContainer implements ClientContainer<RageEventPool> {
    public events: RageEventPool;

    public constructor() {
        this.events = new RageEventPool();
    }
}
