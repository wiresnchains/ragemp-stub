import type { EventPool } from './event';

export interface WebContainer<TEventPool extends EventPool = EventPool> {
    events: TEventPool;
}
