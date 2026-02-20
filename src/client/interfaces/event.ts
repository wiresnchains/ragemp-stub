import type { SharedEventHandler, SharedEventPool } from 'ragemp-stub/shared';

export type EventHandler = SharedEventHandler;

export interface EventPool extends SharedEventPool<EventHandler> {
    /**
     * Registers an event listener using a remote procedure call, expecting to return an answer.
     * @param eventName The name of the event.
     * @param handler The handler that is going to be called when the event is triggered.
     */
    addRpc(eventName: string, handler: EventHandler): void;

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
