import type { SharedEventPool } from 'ragemp-atlas/shared';

export interface EventPool extends SharedEventPool {
    /**
     * Calls a client-side event with the given parameters.
     * @param eventName Target event.
     * @param args Parameters.
     */
    trigger(eventName: string, ...args: any[]): void;
}
