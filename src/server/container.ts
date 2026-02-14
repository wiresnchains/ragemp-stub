import { createJoaatCache } from 'ragemp-atlas/shared';
import type { AtlasContainer } from '@/interfaces/container';
import { MockEventPool } from '@/mock/events';
import { MockPlayer, MockPlayerPool } from '@/mock/player';
import { MockVehicle, MockVehiclePool } from '@/mock/vehicle';
import { RageEventPool } from '@/ragemp/events';
import { RagePlayerPool } from '@/ragemp/player';
import { RageVehiclePool } from '@/ragemp/vehicle';

export function createMockContainer(): AtlasContainer {
    const { get } = createJoaatCache();

    return {
        events: new MockEventPool(),
        players: new MockPlayerPool(id => new MockPlayer(id)),
        vehicles: new MockVehiclePool(id => new MockVehicle(id)),
        joaat: get,
    };
}

export function createRageContainer(): AtlasContainer {
    const { get } = createJoaatCache();

    return {
        events: new RageEventPool(),
        players: new RagePlayerPool(),
        vehicles: new RageVehiclePool(),
        joaat: get,
    };
}
