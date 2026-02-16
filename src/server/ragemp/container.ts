import { createJoaatCache } from 'ragemp-atlas/shared';
import type { ServerContainer } from '@/interfaces/container';
import { RageEventPool } from './event';
import { RagePlayerPool } from './player';
import { RageVehiclePool } from './vehicle';

export class RageServerContainer implements ServerContainer<RageEventPool, RagePlayerPool, RageVehiclePool> {
    public events: RageEventPool;
    public players: RagePlayerPool;
    public vehicles: RageVehiclePool;

    private joaatCache: ReturnType<typeof createJoaatCache>;

    public constructor() {
        this.events = new RageEventPool();
        this.players = new RagePlayerPool();
        this.vehicles = new RageVehiclePool();
        this.joaatCache = createJoaatCache();
    }

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
