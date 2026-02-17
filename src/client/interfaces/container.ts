import type { EventPool } from './event';
import type { Game } from './game';
import type { VehiclePool } from './vehicle';

export interface ClientContainer {
    game: Game;
    events: EventPool;
    vehicles: VehiclePool;
}
