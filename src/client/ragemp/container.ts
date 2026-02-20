import { createJoaatCache } from 'ragemp-stub/shared';
import type { ClientContainer } from '@/interfaces/container';
import { RageEventPool } from './event';
import { RageGame } from './game';
import { RageVehiclePool } from './vehicle';
import { RagePedPool } from './ped';
import { RagePlayerPool } from './player';

export class RageClientContainer implements ClientContainer {
    public game: RageGame = new RageGame();
    public events: RageEventPool = new RageEventPool();
    public peds: RagePedPool = new RagePedPool();
    public vehicles: RageVehiclePool = new RageVehiclePool();
    public players: RagePlayerPool = new RagePlayerPool();

    private joaatCache: ReturnType<typeof createJoaatCache> = createJoaatCache(mp.game.joaat);

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
