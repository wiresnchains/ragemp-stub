import type { EventPool } from './event';
import type { Game } from './game';

export interface ClientContainer {
    game: Game;
    events: EventPool;
}
