export type SharedEventHandler = (...args: any[]) => any;

export interface SharedEventPool<TEventHandler extends SharedEventHandler = SharedEventHandler> {
    /**
     * Registers an event listener for the given event name.
     * @param eventName The name of the event.
     * @param handler The handler that is going to be called when the event is triggered.
     */
    add(eventName: string, handler: TEventHandler): void;

    /**
     * Registers an event listener using a remote procedure call, expecting to return an answer.
     * @param eventName The name of the event.
     * @param handler The handler that is going to be called when the event is triggered.
     */
    addRpc(eventName: string, handler: TEventHandler): void;

    /**
     * Calls an event listener for the given event name.
     * @param eventName The name of the event.
     * @param args Event parameters.
     */
    call(eventName: string, ...args: any[]): void;

    /**
     * Unregisters the given event.
     * @param eventName The name of the event.
     */
    remove(eventName: string): void;
}
