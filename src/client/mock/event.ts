import type { EventHandler, EventPool } from '@/interfaces/event';
import { SharedMockEventPool } from 'ragemp-atlas/shared';

export class MockEventPool extends SharedMockEventPool<EventHandler> implements EventPool {
    public callRemote(_eventName: string, ..._args: any[]): void {}

    public callRemoteRpc<T>(_eventName: string, ..._args: any[]): Promise<T> {
        return new Promise(res => res);
    }
}
