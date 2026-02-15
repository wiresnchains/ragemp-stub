import type { SharedEventHandler, SharedEventPool } from 'ragemp-atlas/shared';
import type { Player } from './player';

export type EventHandler = SharedEventHandler & ((player: Player, ...args: any[]) => any);

export interface EventPool extends SharedEventPool<EventHandler> {}
