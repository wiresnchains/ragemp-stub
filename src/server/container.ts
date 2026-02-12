import type { AtlasContainer } from './interfaces/container';
import { RageEventPool } from './ragemp/events';

export function createTestContainer(): AtlasContainer {
    return {
        events: {} as any,
    };
}

export function createRageContainer(): AtlasContainer {
    return {
        events: new RageEventPool(),
    };
}
