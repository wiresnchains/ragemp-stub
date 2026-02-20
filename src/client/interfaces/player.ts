import type { SharedPlayer } from 'ragemp-stub/shared';
import { VoiceChatFxType } from '@/enums/voice-chat-fx';
import type { BasePed } from './ped';
import type { EntityPool } from './entity';
import type { VoiceChatFx } from './voice-chat-fx';

export interface Player extends BasePed, SharedPlayer {
    /**
     * Whether or not the voice chat is streamed to the client.
     */
    readonly isVoiceChatActive: boolean;

    /**
     * Voice chat volume.
     *
     * Can be set to `"auto"` to enable automatic volume.
     */
    voiceChatVolume: number | 'auto';

    /**
     * Whether or not voice chat is spatialized in the 3d world.
     */
    is3dVoiceChatEnabled: boolean;

    /**
     * Creates a voice chat effect handle.
     * @param fxType
     * @param priority
     */
    createVoiceChatFx<T extends VoiceChatFxType>(fxType: T, priority?: number): VoiceChatFx<T>;
}

export interface PlayerPool extends EntityPool<Player> {
    /**
     * The local player instance.
     */
    readonly local: Player;
}
