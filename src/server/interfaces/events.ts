import type { Player } from './player';

export type EventHandler<T = void> = (player: Player, ...args: any[]) => T;

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
}
