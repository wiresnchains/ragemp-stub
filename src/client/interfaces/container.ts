import type { EventPool } from './event';

export interface ClientContainer<TEventPool extends EventPool = EventPool> {
    events: TEventPool;
}
