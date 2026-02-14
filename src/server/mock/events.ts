import type { EventHandler, EventPool } from '@/interfaces/events';
import type { MockPlayer } from './player';

export class MockEventPool implements EventPool {
    private events: Map<string, EventHandler[]>;
    private rpcEvents: Map<string, EventHandler<any>>;

    public constructor() {
        this.events = new Map();
        this.rpcEvents = new Map();
    }

    public add(eventName: string, handler: EventHandler): void {
        let handlers = this.events.get(eventName);

        if (!handlers) {
            handlers = [];
            this.events.set(eventName, handlers);
        }

        handlers.push(handler);
    }

    public addRPC<T>(eventName: string, handler: EventHandler<T | Promise<T>>): void {
        this.rpcEvents.set(eventName, handler);
    }

    public remove(eventName: string): void {
        this.events.delete(eventName);
        this.rpcEvents.delete(eventName);
    }

    public async call<T>(eventName: string, player: MockPlayer, ...args: any[]): Promise<T | undefined> {
        const handler = this.rpcEvents.get(eventName);

        if (!handler) {
            return undefined;
        }

        return await handler(player, args);
    }
}
