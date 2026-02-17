import type { ClientContainer } from '@/interfaces/container';
import { RageEventPool } from './event';
import { RageGame } from './game';

export class RageClientContainer implements ClientContainer {
    public game: RageGame;
    public events: RageEventPool;

    public constructor() {
        this.game = new RageGame();
        this.events = new RageEventPool();
    }
}
