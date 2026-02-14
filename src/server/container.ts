import { createJoaatCache } from 'ragemp-atlas/shared';
import type { AtlasContainer } from './interfaces/container';
import { RageEventPool } from './ragemp/events';
import { RagePlayerPool } from './ragemp/player';
import { RageVehiclePool } from './ragemp/vehicle';

export function createTestContainer(): AtlasContainer {
    return {
        events: {} as any,
        players: {} as any,
        vehicles: {} as any,
        joaat: createJoaatCache().joaat,
    };
}

export function createRageContainer(): AtlasContainer {
    return {
        events: new RageEventPool(),
        players: new RagePlayerPool(),
        vehicles: new RageVehiclePool(),
        joaat: createJoaatCache().joaat,
    };
}
