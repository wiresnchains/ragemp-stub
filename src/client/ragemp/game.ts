import { Vector3 } from 'ragemp-stub/shared';
import type { Game, GraphicsManager, StreamingManager } from '@/interfaces/game';

export class RageStreamingManager implements StreamingManager {
    public loadAnimDict(animDict: string): void {
        mp.game.streaming.requestAnimDict(animDict);
    }

    public unloadAnimDict(animDict: string): void {
        mp.game.streaming.removeAnimDict(animDict);
    }

    public isAnimDictLoaded(animDict: string): boolean {
        return mp.game.streaming.hasAnimDictLoaded(animDict);
    }

    public loadIpl(iplName: string): void {
        mp.game.streaming.requestIpl(iplName);
    }

    public unloadIpl(iplName: string): void {
        mp.game.streaming.removeIpl(iplName);
    }

    public isIplLoaded(iplName: string): boolean {
        return mp.game.streaming.isIplActive(iplName);
    }
}

export class RageGraphicsManager implements GraphicsManager {
    public notify(message: string): void {
        mp.game.graphics.notify(message);
    }
}

export class RageGame implements Game {
    public streaming: RageStreamingManager = new RageStreamingManager();
    public graphics: RageGraphicsManager = new RageGraphicsManager();

    public invoke(hash: string, ...args: any[]): void {
        mp.game.invoke(hash, ...args);
    }

    public invokeFloat(hash: string, ...args: any[]): number {
        return mp.game.invokeFloat(hash, ...args);
    }

    public invokeString(hash: string, ...args: any[]): string {
        return mp.game.invokeString(hash, ...args);
    }

    public invokeVector3(hash: string, ...args: any[]): Vector3 {
        const result = mp.game.invokeVector3(hash, ...args);
        return new Vector3(result.x, result.y, result.z);
    }
}
