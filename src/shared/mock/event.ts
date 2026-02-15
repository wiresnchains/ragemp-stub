import type { SharedEventHandler, SharedEventPool } from '../interfaces/event';

export class SharedMockEventPool<
    TEventHandler extends SharedEventHandler = SharedEventHandler,
> implements SharedEventPool<TEventHandler> {
    protected events: Map<string, TEventHandler[]>;

    public constructor() {
        this.events = new Map();
    }

    public add(eventName: string, handler: TEventHandler): void {
        let handlers = this.events.get(eventName);

        if (!handlers) {
            handlers = [];
            this.events.set(eventName, handlers);
        }

        handlers.push(handler);
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
    }
}
