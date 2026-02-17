import { SharedMockEventPool, type SharedEventHandler } from 'ragemp-atlas/shared';
import type { EventPool } from '@/interfaces/event';

export class MockEventPool extends SharedMockEventPool implements EventPool {
    private rpcEvents: Map<string, SharedEventHandler> = new Map();

    public override remove(eventName: string): void {
        super.remove(eventName);

        this.rpcEvents.delete(eventName);
    }

    public addRpc(eventName: string, handler: SharedEventHandler): void {
        this.rpcEvents.set(eventName, handler);
    }

    public callRemote(_eventName: string, ..._args: any[]): void {}

    public callRemoteRpc<T>(_eventName: string, ..._args: any[]): Promise<T> {
        // TO-DO
        return new Promise(res => res);
    }
}
