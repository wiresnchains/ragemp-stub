import type { ClientContainer } from '@/interfaces/container';
import { MockEventPool } from './event';
import { MockGame } from './game';

export class MockClientContainer implements ClientContainer {
    public game: MockGame;
    public events: MockEventPool;

    public constructor() {
        this.game = new MockGame();
        this.events = new MockEventPool();
    }
}
