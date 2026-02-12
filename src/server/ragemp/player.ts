import type { VehicleSeat } from '../enums';
import type { Player } from '../interfaces/player';
import type { Vehicle } from '../interfaces/vehicle';
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

    public set health(v) {
        this.entity.health = v;
    }

    public get armour() {
        return this.entity.armour;
    }

    public set armour(v) {
        this.entity.armour = v;
    }

    public get heading() {
        return this.entity.heading;
    }

    public set heading(v) {
        this.entity.heading = v;
    }

    public call(eventName: string, ...args: any[]): void {
        this.entity.call(eventName, args);
    }

    public callRPC<T>(eventName: string, ...args: any[]): Promise<T> {
        return this.entity.callProc<T>(eventName, args);
    }

    public startVoiceStreamFor(player: Player): void {
        const target = mp.players.at(player.id);

        if (target === undefined) {
            return;
        }

        target.enableVoiceTo(target);
    }

    public endVoiceStreamFor(player: Player): void {
        const target = mp.players.at(player.id);

        if (target === undefined) {
            return;
        }

        target.disableVoiceTo(target);
    }

    public isStreamed(player: Player): boolean {
        const target = mp.players.at(player.id);

        if (target === undefined) {
            return false;
        }

        return this.entity.isStreamed(target);
    }

    public placeInVehicle(vehicle: Vehicle, seat: VehicleSeat): void {
        const target = mp.vehicles.at(vehicle.id);

        if (target === undefined) {
            return;
        }

        this.entity.putIntoVehicle(target, seat);
    }
}
