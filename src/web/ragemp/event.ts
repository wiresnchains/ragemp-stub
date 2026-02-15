import type { EventHandler, EventPool } from '@/interfaces/event';

export class RageEventPool implements EventPool {
    public add(eventName: string, handler: EventHandler): void {
        mp.events.add(eventName, handler);
    }

    public call(eventName: string, _: any[]): void {
        mp.events.call(eventName);
    }

    public remove(eventName: string): void {
        mp.events.remove(eventName);
    }

    public trigger(eventName: string, ...args: any[]): void {
        mp.trigger(eventName, ...args);
    }
}
