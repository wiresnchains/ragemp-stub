import type { EventPool } from './event';
import type { PlayerPool } from './player';
import type { VehiclePool } from './vehicle';

export interface ServerContainer {
    events: EventPool;
    players: PlayerPool;
    vehicles: VehiclePool;

    joaat(plainText: string): number;
}
