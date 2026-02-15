import type { EventHandler, EventPool } from '@/interfaces/events';
import type { MockPlayer } from './player';
import type { MockContainer } from '@/container';

export class MockEventPool implements EventPool {
    private events: Map<string, EventHandler[]>;
    private rpcEvents: Map<string, EventHandler<any>>;
    private container: MockContainer;

    public constructor(container: MockContainer) {
        this.events = new Map();
        this.rpcEvents = new Map();
        this.container = container;
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

    public call(eventName: string, player: MockPlayer, ...args: any[]): void {
        const handlers = this.events.get(eventName);

        if (!handlers) {
            return undefined;
        }

        handlers.forEach(handler => handler(player, ...args));
    }

    public callRPC<T>(eventName: string, player: MockPlayer, ...args: any[]): Promise<T> {
        const handler = this.rpcEvents.get(eventName);

        if (!handler) {
            throw new Error(`Handler for ${eventName} does not exist`);
        }

        return handler(player, ...args);
    }
}
