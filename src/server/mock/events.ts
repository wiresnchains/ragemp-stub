import type { EventHandler, EventPool } from '@/interfaces/event';
import { SharedMockEventPool } from 'ragemp-atlas/shared';

export class MockEventPool extends SharedMockEventPool<EventHandler> implements EventPool {}
