import type { ClientContainer } from '@/interfaces/container';
import { MockEventPool } from './event';
import { MockGame } from './game';

export class MockClientContainer implements ClientContainer {
    public game: MockGame = new MockGame();
    public events: MockEventPool = new MockEventPool();
}
