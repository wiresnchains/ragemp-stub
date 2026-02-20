import type { VoiceChatFxType } from '@/enums/voice-chat-fx';
import type { VoiceChatFx, VoiceChatFxSettingsMap } from '@/interfaces/voice-chat-fx';

export class MockVoiceChatFx<
    T extends VoiceChatFxType,
    TSettings extends VoiceChatFxSettingsMap[T] = VoiceChatFxSettingsMap[T],
> implements VoiceChatFx<T, TSettings> {
    public handle: number;
    public priority: number;
    public settings: TSettings | undefined;

    private _isRemoved: boolean = false;

    private static nextHandle = 0;

    public constructor(priority: number = 0) {
        this.handle = MockVoiceChatFx.nextHandle++;
        this.priority = priority;
    }

    public get isRemoved(): boolean {
        return this._isRemoved;
    }

    public apply(settings: TSettings): void {
        this.settings = settings;
    }

    public remove(): void {
        this._isRemoved = true;
    }

    public reset(): void {
        delete this.settings;
    }
}
