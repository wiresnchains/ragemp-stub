import type { EventHandler, EventPool } from '../interfaces/events';

export class RageEventPool implements EventPool {
    public add(eventName: string, handler: EventHandler): void {
        mp.events.add(eventName, handler);
    }

    public addRPC<T>(eventName: string, handler: EventHandler<T | Promise<T>>): void {
        mp.events.add(eventName, handler);
    }

    public remove(eventName: string): void {
        mp.events.remove(eventName);
    }
}
