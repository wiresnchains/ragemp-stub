import type { VehicleSeat } from 'ragemp-stub/shared';
import type { Player, PlayerPool } from '@/interfaces/player';
import type { VoiceChatFxType } from '@/enums/voice-chat-fx';
import { RageBasePed } from './ped';
import { RageVoiceChatFx } from './voice-chat-fx';
import type { RageVehicle } from './vehicle';
import { RageEntityPool } from './entity';

export class RagePlayer extends RageBasePed<PlayerMp> implements Player {
    private static playerMap: Map<PlayerMp, RagePlayer> = new Map();

    public static fromPlayer(player: PlayerMp): RagePlayer {
        let abstractPlayer = this.playerMap.get(player);
        if (abstractPlayer) {
            return abstractPlayer;
        }

        return new RagePlayer(player);
    }

    private constructor(player: PlayerMp) {
        super(player);
        RagePlayer.playerMap.set(player, this);
    }

    public get isVoiceChatActive(): boolean {
        return this.entity.isVoiceActive;
    }

    public get voiceChatVolume(): number | 'auto' {
        return this.entity.voiceAutoVolume ? 'auto' : this.entity.voiceVolume;
    }

    public set voiceChatVolume(voiceChatVolume: number | 'auto') {
        if (voiceChatVolume === 'auto') {
            this.entity.voiceAutoVolume = true;
        } else {
            this.entity.voiceAutoVolume = false;
            this.entity.voiceVolume = voiceChatVolume;
        }
    }

    public get is3dVoiceChatEnabled(): boolean {
        return this.entity.voice3d;
    }

    public set is3dVoiceChatEnabled(is3dVoiceChatEnabled: boolean) {
        this.entity.voice3d = is3dVoiceChatEnabled;
    }

    public placeInVehicle(vehicle: RageVehicle, seat: VehicleSeat): void {
        vehicle.setOccupant(seat, this);
    }

    public createVoiceChatFx<T extends VoiceChatFxType>(fxType: T, priority?: number): RageVoiceChatFx<T> {
        return new RageVoiceChatFx<T>(this.entity, fxType, priority);
    }
}

export class RagePlayerPool extends RageEntityPool<PlayerMp, PlayerMpPool, RagePlayer> implements PlayerPool {
    public constructor() {
        super(mp.players, RagePlayer.fromPlayer);
    }

    public get local(): RagePlayer {
        return RagePlayer.fromPlayer(this.pool.local);
    }
}
