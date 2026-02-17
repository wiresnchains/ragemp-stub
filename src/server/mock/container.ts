import { createJoaatCache } from 'ragemp-atlas/shared';
import type { ServerContainer } from '@/interfaces/container';
import { MockEventPool } from './event';
import { MockPlayer, MockPlayerPool } from './player';
import { MockVehicle, MockVehiclePool } from './vehicle';

export class MockServerContainer implements ServerContainer {
    public events: MockEventPool = new MockEventPool();
    public players: MockPlayerPool = new MockPlayerPool(this, (container, id) => new MockPlayer(container, id));
    public vehicles: MockVehiclePool = new MockVehiclePool(this, (container, id) => new MockVehicle(container, id));

    private joaatCache: ReturnType<typeof createJoaatCache> = createJoaatCache();

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
