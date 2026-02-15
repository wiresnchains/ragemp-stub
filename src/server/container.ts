import { createJoaatCache } from 'ragemp-atlas/shared';
import type { AtlasContainer } from '@/interfaces/container';
import { MockEventPool } from '@/mock/events';
import { MockPlayer, MockPlayerPool } from '@/mock/player';
import { MockVehicle, MockVehiclePool } from '@/mock/vehicle';
import { RageEventPool } from '@/ragemp/events';
import { RagePlayerPool } from '@/ragemp/player';
import { RageVehiclePool } from '@/ragemp/vehicle';

export type MockContainer = AtlasContainer<MockEventPool, MockPlayerPool, MockVehiclePool>;
export type RageContainer = AtlasContainer<RageEventPool, RagePlayerPool, RageVehiclePool>;

export class AtlasMockContainer implements MockContainer {
    public events: MockEventPool;
    public players: MockPlayerPool;
    public vehicles: MockVehiclePool;

    private joaatCache: ReturnType<typeof createJoaatCache>;

    public constructor() {
        this.events = new MockEventPool(this);
        this.players = new MockPlayerPool(this, (container, id) => new MockPlayer(container, id));
        this.vehicles = new MockVehiclePool(this, (container, id) => new MockVehicle(container, id));
        this.joaatCache = createJoaatCache();
    }

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}

export class AtlasRageContainer implements RageContainer {
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
