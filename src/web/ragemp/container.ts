import type { WebContainer } from '@/interfaces/container';
import { RageEventPool } from '@/ragemp/event';

export class RageWebContainer implements WebContainer<RageEventPool> {
    public events: RageEventPool;

    public constructor() {
        this.events = new RageEventPool();
    }
}
