import type { EventPool } from './event';
import type { Game } from './game';

export interface ClientContainer<TGame extends Game = Game, TEventPool extends EventPool = EventPool> {
    game: TGame;
    events: TEventPool;
}
