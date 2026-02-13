import { Vector3 } from 'ragemp-atlas/shared';
import type { Vehicle } from '../interfaces/vehicle';
import { RageEntity } from './entity';
import { RagePlayer } from './player';
import type { VehicleNumberPlateType, VehiclePaint, VehicleSeat } from '../enums';

export class RageVehicle extends RageEntity<VehicleMp> implements Vehicle {
    public get engineHealth(): number {
        return this.entity.engineHealth;
    }

    public get steerAngle(): number {
        return this.entity.steerAngle;
    }

    public get areBrakesActive(): boolean {
        return this.entity.brake;
    }

    public get isHornActive(): boolean {
        return this.entity.horn;
    }

    public get areHighbeamsActive(): boolean {
        return this.entity.highbeams;
    }

    public get isSirenActive(): boolean {
        return this.entity.siren;
    }

    public get streamedPlayers(): RagePlayer[] {
        return this.entity.streamedPlayers.map(player => new RagePlayer(player));
    }

    public get trailer(): RageVehicle | undefined {
        return this.entity.trailer ? new RageVehicle(this.entity.trailer) : undefined;
    }

    public get traileredBy(): RageVehicle | undefined {
        return this.entity.traileredBy ? new RageVehicle(this.entity.traileredBy) : undefined;
    }

    public get velocity(): Vector3 {
        return new Vector3(this.entity.velocity.x, this.entity.velocity.y, this.entity.velocity.z);
    }

    public get bodyHealth(): number {
        return this.entity.bodyHealth;
    }

    public set bodyHealth(bodyHealth: number) {
        this.entity.bodyHealth = bodyHealth;
    }

    public get rotation(): Vector3 {
        return new Vector3(this.entity.rotation.x, this.entity.rotation.y, this.entity.rotation.z);
    }

    public set rotation(rotation: Vector3) {
        this.entity.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z);
    }

    public get isDestroyed(): boolean {
        return this.entity.dead;
    }

    public set isDestroyed(isDestroyed: boolean) {
        this.entity.dead = isDestroyed;
    }

    public get isEngineRunning(): boolean {
        return this.entity.engine;
    }

    public set isEngineRunning(isEngineRunning: boolean) {
        this.entity.engine = isEngineRunning;
    }

    public get isLocked(): boolean {
        return this.entity.locked;
    }

    public set isLocked(isLocked: boolean) {
        this.entity.locked = isLocked;
    }

    public get isMoveable(): boolean {
        return this.entity.movable;
    }

    public set isMoveable(isMoveable: boolean) {
        this.entity.movable = isMoveable;
    }

    public get areNeonLightsActive(): boolean {
        return this.entity.neonEnabled;
    }

    public set areNeonLightsActive(areNeonLightsActive: boolean) {
        this.entity.neonEnabled = areNeonLightsActive;
    }

    public get areTaxiLightsActive(): boolean {
        return this.entity.taxiLights;
    }

    public set areTaxiLightsActive(areTaxiLightsActive: boolean) {
        this.entity.taxiLights = areTaxiLightsActive;
    }

    public get controlledBy(): RagePlayer | undefined {
        return this.entity.controller ? new RagePlayer(this.entity.controller) : undefined;
    }

    public set controlledBy(controlledBy: RagePlayer | undefined) {
        if (controlledBy === undefined) {
            this.entity.controller = undefined;
            return;
        }

        this.entity.controller = controlledBy.entity;
    }

    public get numberPlate(): string {
        return this.entity.numberPlate;
    }

    public set numberPlate(numberPlate: string) {
        this.entity.numberPlate = numberPlate;
    }

    public get numberPlateType(): VehicleNumberPlateType {
        return this.entity.numberPlateType as number;
    }

    public set numberPlateType(numberPlateType: VehicleNumberPlateType) {
        this.entity.numberPlateType = numberPlateType as number;
    }

    public get pearlescentColor(): number {
        return this.entity.pearlescentColor;
    }

    public set pearlescentColor(pearlescentColor: number) {
        this.entity.pearlescentColor = pearlescentColor;
    }

    public get dashboardColor(): number {
        return this.entity.dashboardColor;
    }

    public set dashboardColor(dashboardColor: number) {
        this.entity.dashboardColor = dashboardColor;
    }

    public get trimColor(): number {
        return this.entity.trimColor;
    }

    public set trimColor(trimColor: number) {
        this.entity.trimColor = trimColor;
    }

    public get wheelColor(): number {
        return this.entity.wheelColor;
    }

    public set wheelColor(wheelColor: number) {
        this.entity.wheelColor = wheelColor;
    }

    public get windowTint(): number {
        return this.entity.windowTint;
    }

    public set windowTint(windowTint: number) {
        this.entity.windowTint = windowTint;
    }

    public get primaryPaint(): VehiclePaint {
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

    public getOccupant(seat: VehicleSeat): RagePlayer | undefined {
        return new RagePlayer(this.entity.getOccupant(seat));
    }

    public getOccupants(): RagePlayer[] {
        return this.entity.getOccupants().map(occupant => new RagePlayer(occupant));
    }

    public setOccupant(seat: VehicleSeat, player: RagePlayer): void {
        this.entity.setOccupant(seat, player.entity);
    }

    public isStreamed(player: RagePlayer): boolean {
        return this.entity.isStreamed(player.entity);
    }
}
