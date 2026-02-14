import type { EventPool } from './events';
import type { PlayerPool } from './player';
import type { VehiclePool } from './vehicle';

export interface AtlasContainer {
    events: EventPool;
    players: PlayerPool;
    vehicles: VehiclePool;
    joaat(plainText: string): number;
}
