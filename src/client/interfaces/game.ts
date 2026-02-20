import type { Vector3 } from 'ragemp-stub/shared';

export interface StreamingManager {
    /**
     * Loads the animation dictionary required to play an animation.
     * @param animDict Target animation dictionary.
     */
    loadAnimDict(animDict: string): void;

    /**
     * Unloads an animation dictionary required to play an animation.
     * @param animDict Target animation dictionary.
     */
    unloadAnimDict(animDict: string): void;

    /**
     * Whether or not the animation dictionary is loaded.
     * @param animDict Target animation dictionary.
     */
    isAnimDictLoaded(animDict: string): boolean;

    /**
     * Loads the animation dictionary required to play an animation.
     * @param animDict Target animation dictionary.
     */
    loadIpl(iplName: string): void;

    /**
     * Unloads the IPL.
     * @param iplName Target IPL.
     */
    unloadIpl(iplName: string): void;

    /**
     * Whether or not the IPL is loaded.
     * @param iplName Target IPL.
     */
    isIplLoaded(iplName: string): boolean;
}

export interface GraphicsManager {
    /**
     * Sends a notification to the HUD.
     * @param message Your message. You can use [color codes](https://wiki.rage.mp/wiki/Fonts_and_Colors).
     */
    notify(message: string): void;
}

export interface Game {
    streaming: StreamingManager;
    graphics: GraphicsManager;

    /**
     * Invokes a specified [native](https://nativedb.scheenen.dev/natives) function.
     * @param hash Target hash.
     */
    invoke(hash: string, ...args: any[]): void;

    /**
     * Invokes a specified [native](https://nativedb.scheenen.dev/natives) function that returns a float value.
     * @param hash Target hash.
     */
    invokeFloat(hash: string, ...args: any[]): number;

    /**
     * Invokes a specified [native](https://nativedb.scheenen.dev/natives) function that returns a string value.
     * @param hash Target hash.
     */
    invokeString(hash: string, ...args: any[]): string;

    /**
     * Invokes a specified [native](https://nativedb.scheenen.dev/natives) function that returns a Vector3 value.
     * @param hash Target hash.
     */
    invokeVector3(hash: string, ...args: any[]): Vector3;
}
