import { isNumber, isString, isVector3 } from 'ragemp-atlas/shared';
import type { VehicleSeat } from '@/enums/vehicle';
import type { Player, PlayerPool } from '@/interfaces/player';
import { RageEntity, RageEntityPool } from './entity';
import { RageVehicle } from './vehicle';

export class RagePlayer extends RageEntity<PlayerMp> implements Player {
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

    public get ip() {
        return this.entity.ip;
    }

    public get ping() {
        return this.entity.ping;
    }

    public get packetLoss() {
        return this.entity.packetLoss;
    }

    public get streamedPlayers() {
        return this.entity.streamedPlayers.map(streamedPlayer => new RagePlayer(streamedPlayer));
    }

    public get voiceListeners() {
        return this.entity.voiceListeners.map(voiceListener => new RagePlayer(voiceListener));
    }

    public get socialClub() {
        return this.entity.socialClub;
    }

    public get vehicle() {
        return RageVehicle.fromVehicle(this.entity.vehicle);
    }

    public get seat() {
        return this.entity.seat as number;
    }

    public get health() {
        return this.entity.health;
    }

    public set health(health: number) {
        this.entity.health = health;
    }

    public get armour() {
        return this.entity.armour;
    }

    public set armour(armour: number) {
        this.entity.armour = armour;
    }

    public get heading() {
        return this.entity.heading;
    }

    public set heading(heading: number) {
        this.entity.heading = heading;
    }

    public call(eventName: string, ...args: any[]): void {
        this.entity.call(eventName, args);
    }

    public callRpc<T>(eventName: string, ...args: any[]): Promise<T> {
        return this.entity.callProc<T>(eventName, args);
    }

    public startVoiceStreamFor(player: RagePlayer): void {
        this.entity.enableVoiceTo(player.entity);
    }

    public endVoiceStreamFor(player: RagePlayer): void {
        this.entity.disableVoiceTo(player.entity);
    }

    public isStreamed(player: RagePlayer): boolean {
        return this.entity.isStreamed(player.entity);
    }

    public placeInVehicle(vehicle: RageVehicle, seat: VehicleSeat): void {
        this.entity.putIntoVehicle(vehicle.entity, seat);
    }
}

export class RagePlayerPool
    extends RageEntityPool<PlayerMp, PlayerMpPool, RagePlayer>
    implements PlayerPool<RagePlayer>
{
    public constructor() {
        super(mp.players, RagePlayer.fromPlayer);
    }

    public call(eventName: string, ...args: any[]): void;
    public call(dimension: number, eventName: string, ...args: any[]): void;
    public call(position: Vector3, range: number, eventName: string, ...args: any[]): void;
    public call(position: Vector3, range: number, dimension: number, eventName: string, ...args: any[]): void;
    public call(...params: unknown[]): void {
        if (isString(params[0])) {
            const [eventName, ...args] = params;
            this.pool.call(eventName, args);
            return;
        }

        if (isNumber(params[0]) && isString(params[1])) {
            const [dimension, eventName, ...args] = params;
            this.pool.callInDimension(dimension, eventName, args);
            return;
        }

        if (!isVector3(params[0])) {
            throw new TypeError('Expected Vector3 for `position`');
        }

        if (isNumber(params[1]) && isString(params[2])) {
            const [position, range, eventName, ...args] = params;
            this.pool.callInRange(new mp.Vector3(position.x, position.y, position.z), range, eventName, args);
            return;
        }

        if (isNumber(params[1]) && isNumber(params[2]) && isString(params[3])) {
            const [position, range, dimension, eventName, ...args] = params;
            this.pool.callInRange(
                new mp.Vector3(position.x, position.y, position.z),
                range,
                dimension,
                eventName,
                args
            );
            return;
        }

        throw new TypeError('Invalid call overload');
    }
}
