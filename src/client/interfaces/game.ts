export interface StreamingManager {
    /**
     * Requests and loads the animation dictionary required to play an animation.
     *
     * @param animDict Target animation dictionary.
     */
    requestAnimDict(animDict: string): void;
}

export interface Game {
    streaming: StreamingManager;
}
