import type { WebContainer } from '@/interfaces/container';
import { MockEventPool } from '@/mock/event';
import { RageEventPool } from '@/rage/event';

export class MockWebContainer implements WebContainer<MockEventPool> {
    public events: MockEventPool;

    public constructor() {
        this.events = new MockEventPool();
    }
}

export class RageWebContainer implements WebContainer<RageEventPool> {
    public events: RageEventPool;

    public constructor() {
        this.events = new RageEventPool();
    }
}
