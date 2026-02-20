import { VoiceChatFxType } from '@/enums/voice-chat-fx';
import type { VoiceChatFx, VoiceChatFxSettingsMap } from '@/interfaces/voice-chat-fx';

export class RageVoiceChatFx<T extends VoiceChatFxType> implements VoiceChatFx<T> {
    public handle: number;
    public priority: number;

    private fxType: T;
    private player: PlayerMp;

    public constructor(player: PlayerMp, fxType: T, priority: number = 0) {
        this.player = player;
        this.fxType = fxType;

        // seems like @ragempcommunity have messed up some of their types because this returns a number, not a void
        //@ts-ignore
        this.handle = player.setVoiceFx(fxType, priority);

        this.priority = priority;
    }

    public apply(settings: VoiceChatFxSettingsMap[T]): void {
        switch (this.fxType) {
            case VoiceChatFxType.CHORUS:
                this.player.setVoiceFxChorus(this.handle, settings as any);
                break;
            case VoiceChatFxType.COMPRESSOR:
                this.player.setVoiceFxCompressor(this.handle, settings as any);
                break;
            case VoiceChatFxType.DISTORTION:
                this.player.setVoiceFxDistortion(this.handle, settings as any);
                break;
            case VoiceChatFxType.ECHO:
                this.player.setVoiceFxEcho(this.handle, settings as any);
                break;
            case VoiceChatFxType.FLANGER:
                this.player.setVoiceFxFlanger(this.handle, settings as any);
                break;
            case VoiceChatFxType.GARGLE:
                this.player.setVoiceFxGargle(this.handle, settings as any);
                break;
            case VoiceChatFxType.I3DL2REVERB:
                this.player.setVoiceFxI3DL2Reverb(this.handle, settings as any);
                break;
            case VoiceChatFxType.PARAMEQ:
                this.player.setVoiceFxParamEq(this.handle, settings as any);
                break;
            case VoiceChatFxType.REVERB:
                this.player.setVoiceFxReverb(this.handle, settings as any);
                break;
            case VoiceChatFxType.VOLUME:
                this.player.setVoiceFxVolume(this.handle, settings as any);
                break;
            case VoiceChatFxType.PEAKEQ:
                this.player.setVoiceFxPeakEq(this.handle, settings as any);
                break;
            case VoiceChatFxType.BQF:
                this.player.setVoiceFxBQF(this.handle, settings as any);
                break;
        }
    }

    public remove(): void {
        this.player.removeVoiceFx(this.handle);
    }

    public reset(): void {
        this.player.resetVoiceFx(this.handle);
    }
}
