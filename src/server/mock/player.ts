import { isNumber, isString, isVector3 } from 'ragemp-atlas/shared';
import type { Player, PlayerPool } from '@/interfaces/player';
import type { VehicleSeat } from '@/enums';
import type { MockContainer } from '@/container';
import { MockEntity, MockEntityPool } from './entity';
import type { MockVehicle } from './vehicle';

export class MockPlayer extends MockEntity implements Player {
    public readonly ip: string;
    public readonly ping: number;
    public readonly packetLoss: number;
    public readonly socialClub: string;
    public vehicle?: MockVehicle;
    public seat?: VehicleSeat;

    public get streamedPlayers(): MockPlayer[] {
        return Array.from(this.streamedPlayersSet.values());
    }

    public get voiceListeners(): MockPlayer[] {
        return Array.from(this.voiceListenersSet.values());
    }

    public health: number;
    public armour: number;
    public heading: number;

    private streamedPlayersSet: Set<MockPlayer>;
    private voiceListenersSet: Set<MockPlayer>;

    public constructor(container: MockContainer, id: number) {
        super(container, id);

        this.streamedPlayersSet = new Set();
        this.voiceListenersSet = new Set();

        this.health = 100;
        this.armour = 0;
        this.heading = 0;

        this.ip = '127.0.0.1';
        this.ping = 0;
        this.packetLoss = 0;
        this.socialClub = 'WeirdNewbie';
    }

    public call(eventName: string, ...args: any[]): void {
        this.container.events.call(eventName, this, ...args);
    }

    public callRpc<T>(_eventName: string, ..._args: any[]): Promise<T> {
        // TO-DO
        return new Promise(res => res);
    }

    public startVoiceStreamFor(player: MockPlayer): void {
        this.voiceListenersSet.add(player);
    }

    public endVoiceStreamFor(player: MockPlayer): void {
        this.voiceListenersSet.delete(player);
    }

    public isStreamed(player: MockPlayer): boolean {
        return this.streamedPlayersSet.has(player);
    }

    public placeInVehicle(vehicle: MockVehicle, seat: VehicleSeat): void {
        vehicle.setOccupant(seat, this);
    }
}

export class MockPlayerPool extends MockEntityPool<MockPlayer> implements PlayerPool<MockPlayer> {
    public call(eventName: string, ...args: any[]): void;
    public call(dimension: number, eventName: string, ...args: any[]): void;
    public call(position: Vector3, range: number, eventName: string, ...args: any[]): void;
    public call(position: Vector3, range: number, dimension: number, eventName: string, ...args: any[]): void;
    public call(...params: unknown[]): void {
        if (isString(params[0])) {
            const [eventName, ...args] = params;
            this.container.players.call(eventName, ...args);
            return;
        }

        if (isNumber(params[0]) && isString(params[1])) {
            const [dimension, eventName, ...args] = params;
            this.container.players.forEach(dimension, player => player.call(eventName, ...args));
            return;
        }

        if (!isVector3(params[0])) {
            throw new TypeError('Expected Vector3 for `position`');
        }

        if (isNumber(params[1]) && isString(params[2])) {
            const [position, range, eventName, ...args] = params;
            this.container.players.forEach(position, range, player => player.call(eventName, ...args));
            return;
        }

        if (isNumber(params[1]) && isNumber(params[2]) && isString(params[3])) {
            const [position, range, dimension, eventName, ...args] = params;
            this.container.players.forEach(position, range, dimension, player => player.call(eventName, ...args));
            return;
        }

        throw new TypeError('Invalid call overload');
    }
}
