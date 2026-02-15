import type { EventPool } from './event';

export interface AtlasContainer<TEventPool extends EventPool = EventPool> {
    events: TEventPool;
}
