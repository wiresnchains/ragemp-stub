import type { SharedEventHandler, SharedEventPool } from 'ragemp-atlas/shared';

export type EventHandler = SharedEventHandler & ((...args: any[]) => any);

export interface EventPool extends SharedEventPool<EventHandler> {
    /**
     * Calls a remote event
     * @param eventName  The name of the event.
     * @param args Parameters.
     */
    callRemote(eventName: string, ...args: any[]): void;

    /**
     * Calls a remote event using a remote procedure call, expecting to return an answer.
     * @param eventName The name of the event.
     * @param args Parameters.
     */
    callRemoteRpc<T>(eventName: string, ...args: any[]): Promise<T>;
}
