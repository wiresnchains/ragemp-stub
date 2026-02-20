import type { WebContainer } from '@/interfaces/container';
import { MockEventPool } from '@/mock/event';

export class MockWebContainer implements WebContainer {
    public events: MockEventPool = new MockEventPool();
}
