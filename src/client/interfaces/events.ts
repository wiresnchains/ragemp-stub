export type EventHandler<T = void> = (...args: any[]) => T;

export interface EventPool {
    /**
     * Registers an event listener for the given event name.
     * @param eventName The name of the event.
     * @param handler The handler that is going to be called when the event is triggered.
     */
    add(eventName: string, handler: EventHandler): void;

    /**
     * Registers an event listener using a remote procedure call, expecting to return an answer.
     * @param eventName The name of the event.
     * @param handler The handler that is going to be called when the event is triggered.
     */
    addRPC<T>(eventName: string, handler: EventHandler<T | Promise<T>>): void;

    /**
     * Unregisters the given event.
     * @param eventName The name of the event.
     */
    remove(eventName: string): void;

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
    callRemoteRPC<T>(eventName: string, ...args: any[]): T | Promise<T>;
}
