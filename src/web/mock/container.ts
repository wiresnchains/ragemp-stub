import type { WebContainer } from '@/interfaces/container';
import { MockEventPool } from '@/mock/event';

export class MockWebContainer implements WebContainer<MockEventPool> {
    public events: MockEventPool;

    public constructor() {
        this.events = new MockEventPool();
    }
}
