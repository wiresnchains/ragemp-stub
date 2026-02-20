import { isNumber, isString, isVector3, Vector3 } from 'ragemp-stub/shared';
import type { Game, GraphicsManager, StreamingManager } from '@/interfaces/game';

export class MockStreamingManager implements StreamingManager {
    private loadedAnimDicts: Set<string> = new Set();
    private loadedIpls: Set<string> = new Set();

    public loadAnimDict(animDict: string): void {
        this.loadedAnimDicts.add(animDict);
    }

    public unloadAnimDict(animDict: string): void {
        this.loadedAnimDicts.delete(animDict);
    }

    public isAnimDictLoaded(animDict: string): boolean {
        return this.loadedAnimDicts.has(animDict);
    }

    public loadIpl(iplName: string): void {
        this.loadedIpls.add(iplName);
    }

    public unloadIpl(iplName: string): void {
        this.loadedIpls.delete(iplName);
    }

    public isIplLoaded(iplName: string): boolean {
        return this.loadedIpls.has(iplName);
    }
}

export class MockGraphicsManager implements GraphicsManager {
    public sentNotifications: string[] = [];

    public notify(message: string): void {
        this.sentNotifications.push(message);
    }
}

export type MockNativeHandler = (...args: any) => void | number | string | Vector3;

export class MockGame implements Game {
    public streaming: MockStreamingManager = new MockStreamingManager();
    public graphics: MockGraphicsManager = new MockGraphicsManager();

    private nativeMocks: Map<string, MockNativeHandler> = new Map();

    public setNativeMock(hash: string, handler: MockNativeHandler): void {
        this.nativeMocks.set(hash, handler);
    }

    public invoke(hash: string, ...args: any[]): void {
        const handler = this.nativeMocks.get(hash);

        if (!handler) {
            throw new Error(
                `Native mock for ${hash} was not set. Please set it using \`setNativeMock\` method before invoking it in a mock.`
            );
        }

        handler(...args);
    }

    public invokeFloat(hash: string, ...args: any[]): number {
        const handler = this.nativeMocks.get(hash);

        if (!handler) {
            throw new Error(
                `Native mock for ${hash} was not set. Please set it using \`setNativeMock\` method before invoking it in a mock.`
            );
        }

        const result = handler(...args);

        if (!isNumber(result)) {
            throw new Error(
                `Native mock for ${hash} was invoked using \`invokeFloat\` but it returned ${typeof result}.`
            );
        }

        return result;
    }

    public invokeString(hash: string, ...args: any[]): string {
        const handler = this.nativeMocks.get(hash);

        if (!handler) {
            throw new Error(
                `Native mock for ${hash} was not set. Please set it using \`setNativeMock\` method before invoking it in a mock.`
            );
        }

        const result = handler(...args);

        if (!isString(result)) {
            throw new Error(
                `Native mock for ${hash} was invoked using \`invokeString\` but it returned ${typeof result}.`
            );
        }

        return result;
    }

    public invokeVector3(hash: string, ...args: any[]): Vector3 {
        const handler = this.nativeMocks.get(hash);

        if (!handler) {
            throw new Error(
                `Native mock for ${hash} was not set. Please set it using \`setNativeMock\` method before invoking it in a mock.`
            );
        }

        const result = handler(...args);

        if (!isVector3(result)) {
            throw new Error(
                `Native mock for ${hash} was invoked using \`invokeVector3\` but it returned ${typeof result}.`
            );
        }

        return result;
    }
}
