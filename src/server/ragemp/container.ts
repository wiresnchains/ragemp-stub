import { createJoaatCache } from 'ragemp-atlas/shared';
import type { ServerContainer } from '@/interfaces/container';
import { RageEventPool } from './event';
import { RagePlayerPool } from './player';
import { RageVehiclePool } from './vehicle';

export class RageServerContainer implements ServerContainer {
    public events: RageEventPool = new RageEventPool();
    public players: RagePlayerPool = new RagePlayerPool();
    public vehicles: RageVehiclePool = new RageVehiclePool();

    private joaatCache: ReturnType<typeof createJoaatCache> = createJoaatCache();

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
