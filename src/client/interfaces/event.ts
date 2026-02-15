import type { SharedEventHandler, SharedEventPool } from 'ragemp-atlas/shared';

export interface EventPool extends SharedEventPool {
    /**
     * Registers an event listener using a remote procedure call, expecting to return an answer.
     * @param eventName The name of the event.
     * @param handler The handler that is going to be called when the event is triggered.
     */
    addRpc(eventName: string, handler: SharedEventHandler): void;

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
