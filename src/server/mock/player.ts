import type { Player, PlayerPool } from '@/interfaces/player';
import type { VehicleSeat } from '@/enums';
import { MockEntity, MockEntityPool } from './entity';
import type { MockVehicle } from './vehicle';

export class MockPlayer extends MockEntity implements Player {
    public readonly ip: string;
    public readonly ping: number;
    public readonly packetLoss: number;
    public readonly streamedPlayers: MockPlayer[];
    public readonly voiceListeners: MockPlayer[];
    public readonly socialClub: string;
    public readonly vehicle?: MockVehicle;
    public readonly seat?: VehicleSeat;

    public health: number;
    public armour: number;
    public heading: number;

    public constructor(id: number) {
        super(id);

        this.streamedPlayers = [];
        this.voiceListeners = [];

        this.health = 100;
        this.armour = 0;
        this.heading = 0;

        this.ip = '127.0.0.1';
        this.ping = 0;
        this.packetLoss = 0;
        this.socialClub = 'WeirdNewbie';
    }

    public call(eventName: string, ...args: any[]): void {}

    public callRPC<T>(eventName: string, ...args: any[]): Promise<T> {
        return new Promise(res => res);
    }

    public startVoiceStreamFor(player: MockPlayer): void {}

    public endVoiceStreamFor(player: MockPlayer): void {}

    public isStreamed(player: MockPlayer): boolean {
        return false;
    }

    public placeInVehicle(vehicle: MockVehicle, seat: VehicleSeat): void {}
}

export class MockPlayerPool extends MockEntityPool<MockPlayer> implements PlayerPool<MockPlayer> {
    public call(eventName: string, ...args: any[]): void;
    public call(dimension: number, eventName: string, ...args: any[]): void;
    public call(position: Vector3, range: number, eventName: string, ...args: any[]): void;
    public call(position: Vector3, range: number, dimension: number, eventName: string, ...args: any[]): void;
    public call(
        position: unknown,
        range?: unknown,
        dimension?: unknown,
        eventName?: unknown,
        ...args: unknown[]
    ): void {}
}
