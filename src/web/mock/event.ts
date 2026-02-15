import { SharedMockEventPool } from 'ragemp-atlas/shared';
import type { EventPool } from '@/interfaces/event';

export class MockEventPool extends SharedMockEventPool implements EventPool {
    public trigger(_eventName: string, ..._args: any[]): void {
        // TO-DO
    }
}
