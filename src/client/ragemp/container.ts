import type { ClientContainer } from '@/interfaces/container';
import { RageEventPool } from './event';
import { RageGame } from './game';
import { RageVehiclePool } from './vehicle';

export class RageClientContainer implements ClientContainer {
    public game: RageGame = new RageGame();
    public events: RageEventPool = new RageEventPool();
    public vehicles: RageVehiclePool = new RageVehiclePool();
}
