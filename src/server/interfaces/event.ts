import type { SharedEventHandler, SharedEventPool } from 'ragemp-stub/shared';
import type { Player } from './player';

export type EventHandler = SharedEventHandler & ((player: Player, ...args: any[]) => any);

export interface EventPool extends SharedEventPool<EventHandler> {
    /**
     * Registers an event listener using a remote procedure call, expecting to return an answer.
     * @param eventName The name of the event.
     * @param handler The handler that is going to be called when the event is triggered.
     */
    addRpc(eventName: string, handler: EventHandler): void;
}
