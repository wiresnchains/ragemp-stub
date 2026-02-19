import { createJoaatCache } from 'ragemp-atlas/shared';
import type { ClientContainer } from '@/interfaces/container';
import { RageEventPool } from './event';
import { RageGame } from './game';
import { RageVehiclePool } from './vehicle';
import { RagePedPool } from './ped';

export class RageClientContainer implements ClientContainer {
    public game: RageGame = new RageGame();
    public events: RageEventPool = new RageEventPool();
    public peds: RagePedPool = new RagePedPool();
    public vehicles: RageVehiclePool = new RageVehiclePool();

    private joaatCache: ReturnType<typeof createJoaatCache> = createJoaatCache();

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
