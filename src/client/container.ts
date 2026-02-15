import type { AtlasContainer } from './interfaces/container';
import { MockEventPool } from './mock/event';
import { RageEventPool } from './ragemp/event';

export type MockContainer = AtlasContainer<MockEventPool>;
export type RageContainer = AtlasContainer<RageEventPool>;

export class AtlasMockContainer implements MockContainer {
    public events: MockEventPool;

    public constructor() {
        this.events = new MockEventPool();
    }
}

export class AtlasRageContainer implements RageContainer {
    public events: RageEventPool;

    public constructor() {
        this.events = new RageEventPool();
    }
}
