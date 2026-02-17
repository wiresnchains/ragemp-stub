import { createJoaatCache } from 'ragemp-atlas/shared';
import type { ServerContainer } from '@/interfaces/container';
import { MockEventPool } from './event';
import { MockPlayer, MockPlayerPool } from './player';
import { MockVehicle, MockVehiclePool } from './vehicle';

export class MockServerContainer implements ServerContainer {
    public events: MockEventPool;
    public players: MockPlayerPool;
    public vehicles: MockVehiclePool;

    private joaatCache: ReturnType<typeof createJoaatCache>;

    public constructor() {
        this.events = new MockEventPool();
        this.players = new MockPlayerPool(this, (container, id) => new MockPlayer(container, id));
        this.vehicles = new MockVehiclePool(this, (container, id) => new MockVehicle(container, id));
        this.joaatCache = createJoaatCache();
    }

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
