import type { EventHandler, EventPool } from '@/interfaces/event';

export class RageEventPool implements EventPool {
    public add(eventName: string, handler: EventHandler): void {
        mp.events.add(eventName, handler);
    }

    public addRpc(eventName: string, handler: EventHandler): void {
        mp.events.addProc(eventName, handler);
    }

    public remove(eventName: string): void {
        mp.events.remove(eventName);
    }

    public call(eventName: string, ...args: any[]): void {
        mp.events.call(eventName, ...args);
    }

    public callRemote(eventName: string, ...args: any[]): void {
        mp.events.callRemote(eventName, ...args);
    }

    public callRemoteRpc<T>(eventName: string, ...args: any[]): Promise<T> {
        return mp.events.callRemoteProc(eventName, ...args);
    }
}
