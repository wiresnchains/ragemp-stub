import { Vector3 } from 'ragemp-atlas/shared';
import type { Vehicle } from '../interfaces/vehicle';
import { RageEntity } from './entity';
import { RagePlayer } from './player';
import type { VehicleSeat } from '../enums';
import type { Player } from '../interfaces/player';

export class RageVehicle extends RageEntity<VehicleMp> implements Vehicle {
    public get engineHealth() {
        return this.entity.engineHealth;
    }

    public get steerAngle() {
        return this.entity.steerAngle;
    }

    public get areBrakesActive() {
        return this.entity.brake;
    }

    public get isHornActive() {
        return this.entity.horn;
    }

    public get areHighbeamsActive() {
        return this.entity.highbeams;
    }

    public get sirenActive() {
        return this.entity.siren;
    }

    public get streamedPlayers() {
        return this.entity.streamedPlayers.map(player => new RagePlayer(player));
    }

    //@ts-ignore
    public get trailer() {
        return this.entity.trailer !== undefined ? new RageVehicle(this.entity.trailer) : undefined;
    }

    //@ts-ignore
    public get traileredBy() {
        return this.entity.traileredBy !== undefined ? new RageVehicle(this.entity.traileredBy) : undefined;
    }

    public get velocity() {
        return this.entity.velocity;
    }

    public get bodyHealth() {
        return this.entity.bodyHealth;
    }

    public set bodyHealth(v) {
        this.entity.bodyHealth = v;
    }

    public get rotation() {
        return new Vector3(this.entity.rotation.x, this.entity.rotation.y, this.entity.rotation.z);
    }

    public set rotation(v) {
        this.entity.rotation = new mp.Vector3(v.x, v.y, v.z);
    }

    public get isDestroyed() {
        return this.entity.dead;
    }

    public set isDestroyed(v) {
        this.entity.dead = v;
    }

    public get isEngineRunning() {
        return this.entity.engine;
    }

    public set isEngineRunning(v) {
        this.entity.engine = v;
    }

    public get isLocked() {
        return this.entity.locked;
    }

    public set isLocked(v) {
        this.entity.locked = v;
    }

    public get isMoveable() {
        return this.entity.movable;
    }

    public set isMoveable(v) {
        this.entity.movable = v;
    }

    public get neonLightsActive() {
        return this.entity.neonEnabled;
    }

    public set neonLightsActive(v) {
        this.entity.neonEnabled = v;
    }

    public get taxiLightsActive() {
        return this.entity.taxiLights;
    }

    public set taxiLightsActive(v) {
        this.entity.taxiLights = v;
    }

    public get controlledBy() {
        return this.entity.controller ? new RagePlayer(this.entity.controller) : undefined;
    }

    public set controlledBy(v) {
        if (v === undefined) {
            this.entity.controller = undefined;
            return;
        }

        const target = mp.players.at(v.id);

        if (target === undefined) {
            return;
        }

        this.entity.controller = target;
    }

    public get numberPlate() {
        return this.entity.numberPlate;
    }

    public set numberPlate(v) {
        this.entity.numberPlate = v;
    }

    public get numberPlateType() {
        return this.entity.numberPlateType as number;
    }

    public set numberPlateType(v) {
        this.entity.numberPlateType = v;
    }

    public get pearlescentColor() {
        return this.entity.pearlescentColor;
    }

    public set pearlescentColor(v) {
        this.entity.pearlescentColor = v;
    }

    public get dashboardColor() {
        return this.entity.dashboardColor;
    }

    public set dashboardColor(v) {
        this.entity.dashboardColor = v;
    }

    public get trimColor() {
        return this.entity.trimColor;
    }

    public set trimColor(v) {
        this.entity.trimColor = v;
    }

    public get wheelColor() {
        return this.entity.wheelColor;
    }

    public set wheelColor(v) {
        this.entity.wheelColor = v;
    }

    public get windowTint() {
        return this.entity.windowTint;
    }

    public set windowTint(v) {
        this.entity.windowTint = v;
    }

    public get primaryPaint() {
        return this.entity.getPaint(0);
    }

    public set primaryPaint(v) {
        const primaryColor = this.primaryColor.asRGB();
        const secondaryColor = this.secondaryColor.asRGB();

        this.entity.setPaint(v, 0, this.secondaryPaint, 0);

        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }

    public get primaryColor() {
        return {} as any;
    }

    public set primaryColor(_) {}

    public get secondaryPaint() {
        return this.entity.getPaint(1);
    }

    public set secondaryPaint(v) {
        const primaryColor = this.primaryColor.asRGB();
        const secondaryColor = this.secondaryColor.asRGB();

        this.entity.setPaint(this.primaryPaint, 0, v, 0);

        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }

    public get secondaryColor() {
        return {} as any;
    }

    public set secondaryColor(_) {}

    public get neonColor() {
        return {} as any;
    }

    public set neonColor(_) {}

    public explode(): void {}

    public repair(): void {}

    public getOccupant(seat: VehicleSeat): Player | undefined {
        return new RagePlayer(this.entity.getOccupant(seat));
    }

    public getOccupants(): Player[] {
        return this.entity.getOccupants().map(occupant => new RagePlayer(occupant));
    }

    public setOccupant(seat: VehicleSeat, player: Player): void {
        const target = mp.players.at(player.id);

        if (target === undefined) {
            return;
        }

        this.entity.setOccupant(seat, target);
    }

    public isStreamed(player: Player): boolean {
        const target = mp.players.at(player.id);

        if (target === undefined) {
            return false;
        }

        return this.entity.isStreamed(target);
    }
}
