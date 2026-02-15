import type { EventPool } from './event';
import type { PlayerPool } from './player';
import type { VehiclePool } from './vehicle';

export interface AtlasContainer<
    TEvents extends EventPool = EventPool,
    TPlayers extends PlayerPool = PlayerPool,
    TVehicles extends VehiclePool = VehiclePool,
> {
    events: TEvents;
    players: TPlayers;
    vehicles: TVehicles;
    joaat(plainText: string): number;
}
