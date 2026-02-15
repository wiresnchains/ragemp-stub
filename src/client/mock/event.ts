import type { EventHandler, EventPool } from '@/interfaces/event';
import { SharedMockEventPool } from 'ragemp-atlas/shared';

export class MockEventPool extends SharedMockEventPool<EventHandler> implements EventPool {
    private rpcEvents: Map<string, EventHandler>;

    public constructor() {
        super();

        this.rpcEvents = new Map();
    }

    public override remove(eventName: string): void {
        super.remove(eventName);

        this.rpcEvents.delete(eventName);
    }

    public addRpc(eventName: string, handler: EventHandler): void {
        this.rpcEvents.set(eventName, handler);
    }

    public callRemote(_eventName: string, ..._args: any[]): void {}

    public callRemoteRpc<T>(_eventName: string, ..._args: any[]): Promise<T> {
        return new Promise(res => res);
    }
}
