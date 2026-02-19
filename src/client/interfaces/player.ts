import type { SharedPlayer } from 'ragemp-stub/shared';
import type { BasePed } from './ped';
import type { EntityPool } from './entity';

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
    enable3dVoiceChat: boolean;
}

export interface PlayerPool extends EntityPool<Player> {
    /**
     * The local player instance.
     */
    readonly local: Player;
}
