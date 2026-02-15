import type { SharedEventHandler, SharedEventPool } from 'ragemp-atlas/shared';

export type EventHandler = SharedEventHandler;

export interface EventPool extends SharedEventPool<EventHandler> {
    /**
     * Calls a client-side event with the given parameters.
     * @param eventName Target event.
     * @param args Parameters.
     */
    trigger(eventName: string, ...args: any[]): void;
}
