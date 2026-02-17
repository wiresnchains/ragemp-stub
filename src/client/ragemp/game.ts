import type { Game, StreamingManager } from '@/interfaces/game';

export class RageStreamingManager implements StreamingManager {
    public requestAnimDict(animDict: string): void {
        mp.game.streaming.requestAnimDict(animDict);
    }
}

export class RageGame implements Game {
    public streaming: RageStreamingManager = new RageStreamingManager();
}
