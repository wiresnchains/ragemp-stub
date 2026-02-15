import type { ClientContainer } from './interfaces/container';
import { MockEventPool } from './mock/event';
import { RageEventPool } from './ragemp/event';

export class MockClientContainer implements ClientContainer<MockEventPool> {
    public events: MockEventPool;

    public constructor() {
        this.events = new MockEventPool();
    }
}

export class RageClientContainer implements ClientContainer<RageEventPool> {
    public events: RageEventPool;

    public constructor() {
        this.events = new RageEventPool();
    }
}
