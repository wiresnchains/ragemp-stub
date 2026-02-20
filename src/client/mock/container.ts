import { createJoaatCache, joaat } from 'ragemp-stub/shared';
import type { ClientContainer } from '@/interfaces/container';
import { MockEventPool } from './event';
import { MockGame } from './game';
import { MockPedPool } from './ped';
import { MockVehiclePool } from './vehicle';
import { MockPlayerPool } from './player';

export class MockClientContainer implements ClientContainer {
    public game: MockGame = new MockGame();
    public events: MockEventPool = new MockEventPool();
    public peds: MockPedPool = new MockPedPool(this);
    public vehicles: MockVehiclePool = new MockVehiclePool(this);
    public players: MockPlayerPool = new MockPlayerPool(this);

    private joaatCache: ReturnType<typeof createJoaatCache> = createJoaatCache(joaat);

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
