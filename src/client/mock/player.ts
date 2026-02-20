import type { VehicleSeat } from 'ragemp-stub/shared';
import type { VoiceChatFxType } from '@/enums/voice-chat-fx';
import type { Player, PlayerPool } from '@/interfaces/player';
import type { VoiceChatFx } from '@/interfaces/voice-chat-fx';
import { MockVoiceChatFx } from './voice-chat-fx';
import type { MockVehicle } from './vehicle';
import { MockBasePed } from './ped';
import { MockEntityPool } from './entity';
import type { MockClientContainer } from './container';

export class MockPlayer extends MockBasePed implements Player {
    public readonly isVoiceChatActive: boolean = false;
    public voiceChatVolume: number | 'auto' = 1;
    public is3dVoiceChatEnabled: boolean = false;

    public createVoiceChatFx<T extends VoiceChatFxType>(_fxType: T, priority?: number): VoiceChatFx<T> {
        return new MockVoiceChatFx<T>(priority);
    }

    public placeInVehicle(vehicle: MockVehicle, seat: VehicleSeat): void {
        vehicle.setOccupant(seat, this);
    }
}

export class MockPlayerPool extends MockEntityPool<MockPlayer> implements PlayerPool {
    public constructor(container: MockClientContainer) {
        super(container, (container, id) => new MockPlayer(container, id, 0, 0));
    }

    public local: Player = this.createEntity();
}
