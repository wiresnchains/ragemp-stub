import { isNumber, isString, isVector3, VehicleSeat } from 'ragemp-stub/shared';
import type { Player, PlayerPool } from '@/interfaces/player';
import { MockEntity, MockEntityPool } from './entity';
import type { MockVehicle } from './vehicle';

export class MockPlayer extends MockEntity implements Player {
    public heading: number = 0;
    public vehicle?: MockVehicle;
    public seat?: VehicleSeat;
    public health: number = 100;
    public armour: number = 0;

    public readonly ip: string = '127.0.0.1';
    public readonly ping: number = 0;
    public readonly packetLoss: number = 0;
    public readonly socialClub: string = 'WeirdNewbie';

    private streamedPlayersSet: Set<MockPlayer> = new Set();
    private voiceListenersSet: Set<MockPlayer> = new Set();

    public get streamedPlayers(): MockPlayer[] {
        return Array.from(this.streamedPlayersSet.values());
    }

    public get voiceListeners(): MockPlayer[] {
        return Array.from(this.voiceListenersSet.values());
    }

    public placeInVehicle(vehicle: MockVehicle, seat: VehicleSeat): void {
        vehicle.setOccupant(seat, this);
    }

    public call(_eventName: string, ..._args: any[]): void {
        // TO-DO
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
}

export class MockPlayerPool extends MockEntityPool<MockPlayer> implements PlayerPool {
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
