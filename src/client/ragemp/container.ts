import type { ClientContainer } from '@/interfaces/container';
import { RageEventPool } from '@/ragemp/event';
import { RageGame } from './game';

export class RageClientContainer implements ClientContainer<RageGame, RageEventPool> {
    public game: RageGame;
    public events: RageEventPool;

    public constructor() {
        this.game = new RageGame();
        this.events = new RageEventPool();
    }
}
