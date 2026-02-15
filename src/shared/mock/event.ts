import type { SharedEventHandler, SharedEventPool } from '../interfaces/event';

export class SharedMockEventPool<
    TEventHandler extends SharedEventHandler = SharedEventHandler,
> implements SharedEventPool<TEventHandler> {
    private events: Map<string, TEventHandler[]>;
    private rpcEvents: Map<string, TEventHandler>;

    public constructor() {
        this.events = new Map();
        this.rpcEvents = new Map();
    }

    public add(eventName: string, handler: TEventHandler): void {
        let handlers = this.events.get(eventName);

        if (!handlers) {
            handlers = [];
            this.events.set(eventName, handlers);
        }

        handlers.push(handler);
    }

    public addRpc(eventName: string, handler: TEventHandler): void {
        this.rpcEvents.set(eventName, handler);
    }

    public call(eventName: string, ...args: any[]): void {
        const handlers = this.events.get(eventName);

        if (!handlers) {
            return undefined;
        }

        handlers.forEach(handler => handler(...args));
    }

    public remove(eventName: string): void {
        this.events.delete(eventName);
        this.rpcEvents.delete(eventName);
    }
}
