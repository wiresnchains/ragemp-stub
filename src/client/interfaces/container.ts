import type { EventPool } from './event';
import type { Game } from './game';
import type { PedPool } from './ped';
import type { VehiclePool } from './vehicle';

export interface ClientContainer {
    game: Game;
    events: EventPool;
    peds: PedPool;
    vehicles: VehiclePool;
}
