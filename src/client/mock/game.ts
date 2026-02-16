import type { Game, StreamingManager } from '@/interfaces/game';

export class MockStreamingManager implements StreamingManager {
    public requestedAnimDicts: Set<string>;

    public constructor() {
        this.requestedAnimDicts = new Set();
    }

    public requestAnimDict(animDict: string): void {
        this.requestedAnimDicts.add(animDict);
    }
}

export class MockGame implements Game {
    public streaming: MockStreamingManager;

    public constructor() {
        this.streaming = new MockStreamingManager();
    }
}
