import type { VehicleSeat } from '../enums';
import type { Player } from '../interfaces/player';
import { RageEntity } from './entity';
import { RageVehicle } from './vehicle';

export class RagePlayer extends RageEntity<PlayerMp> implements Player {
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
        return new RageVehicle(this.entity.vehicle);
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

    public callRPC<T>(eventName: string, ...args: any[]): Promise<T> {
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
