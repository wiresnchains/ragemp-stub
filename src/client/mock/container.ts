import type { ClientContainer } from '@/interfaces/container';
import { MockEventPool } from '@/mock/event';

export class MockClientContainer implements ClientContainer<MockEventPool> {
    public events: MockEventPool;

    public constructor() {
        this.events = new MockEventPool();
    }
}
