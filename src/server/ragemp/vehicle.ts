import { Vector3 } from 'ragemp-atlas/shared';
import type { Vehicle, VehiclePool, VehicleSpawnOptions } from '@/interfaces/vehicle';
import type { VehicleNumberPlateType, VehiclePaint, VehicleSeat } from '@/enums';
import { RageEntity, RageEntityPool } from './entity';
import { RagePlayer } from './player';

export class RageVehicle extends RageEntity<VehicleMp> implements Vehicle {
    private static vehicleMap: Map<VehicleMp, RageVehicle> = new Map();

    public static fromVehicle(vehicle: VehicleMp): RageVehicle {
        let abstractVehicle = this.vehicleMap.get(vehicle);
        if (abstractVehicle) {
            return abstractVehicle;
        }

        return new RageVehicle(vehicle);
    }

    private constructor(vehicle: VehicleMp) {
        super(vehicle);
        RageVehicle.vehicleMap.set(vehicle, this);
    }

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
        return this.entity.streamedPlayers.map(player => RagePlayer.fromPlayer(player));
    }

    public get occupants(): RagePlayer[] {
        return this.entity.getOccupants().map(player => RagePlayer.fromPlayer(player));
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

    public get heading(): number {
        return this.entity.heading;
    }

    public set heading(heading: number) {
        // TODO: set rotation? idk which value stands for heading rotation, will figure it out later
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
        return this.entity.controller ? RagePlayer.fromPlayer(this.entity.controller) : undefined;
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

    public set primaryPaint(primaryPaint: VehiclePaint) {
        this.entity.setPaint(primaryPaint, this.primaryColor, this.secondaryPaint, this.secondaryColor);
    }

    public get secondaryPaint(): VehiclePaint {
        return this.entity.getPaint(1);
    }

    public set secondaryPaint(secondaryPaint: VehiclePaint) {
        this.entity.setPaint(this.primaryPaint, this.primaryColor, secondaryPaint, this.secondaryColor);
    }

    public get primaryColor() {
        return this.entity.getColor(0);
    }

    public set primaryColor(primaryColor: number) {
        this.entity.setColor(primaryColor, this.secondaryColor);
    }

    public get secondaryColor() {
        return this.entity.getColor(1);
    }

    public set secondaryColor(secondaryColor: number) {
        this.entity.setColor(this.primaryColor, secondaryColor);
    }

    public get pearlescentColor(): number {
        return this.entity.pearlescentColor;
    }

    public set pearlescentColor(pearlescentColor: number) {
        this.entity.pearlescentColor = pearlescentColor;
    }

    public explode(): void {}

    public repair(): void {}

    public getOccupant(seat: VehicleSeat): RagePlayer | undefined {
        return RagePlayer.fromPlayer(this.entity.getOccupant(seat));
    }

    public setOccupant(seat: VehicleSeat, player: RagePlayer): void {
        this.entity.setOccupant(seat, player.entity);
    }

    public setPrimaryColorRGB(red: number, green: number, blue: number): void {
        let secondaryColor = this.entity.getVariable('secondaryColor');
        if (!secondaryColor) {
            secondaryColor = { red: 0, green: 0, blue: 0 };
        }

        this.entity.setColorRGB(red, green, blue, secondaryColor.red, secondaryColor.green, secondaryColor.blue);
        this.entity.setVariable('primaryColor', { red, green, blue });
    }

    public setSecondaryColorRGB(red: number, green: number, blue: number): void {
        let primaryColor = this.entity.getVariable('primaryColor');
        if (!primaryColor) {
            primaryColor = { red: 0, green: 0, blue: 0 };
        }

        this.entity.setColorRGB(primaryColor.red, primaryColor.green, primaryColor.blue, red, green, blue);
        this.entity.setVariable('secondaryColor', { red, green, blue });
    }

    public setNeonColorRGB(red: number, green: number, blue: number): void {
        this.entity.setNeonColor(red, green, blue);
    }

    public isStreamed(player: RagePlayer): boolean {
        return this.entity.isStreamed(player.entity);
    }
}

export class RageVehiclePool
    extends RageEntityPool<VehicleMp, VehicleMpPool, RageVehicle>
    implements VehiclePool<RageVehicle>
{
    public constructor() {
        super(mp.vehicles, RageVehicle.fromVehicle);
    }

    public spawn(model: string | number, position: Vector3, options: VehicleSpawnOptions = {}): RageVehicle {
        return RageVehicle.fromVehicle(
            this.pool.new(model, new mp.Vector3(position.x, position.y, position.z), {
                dimension: options.dimension,
                heading: options.heading,
                numberPlate: options.numberPlate,
                engine: options.isEngineRunning,
                locked: options.isLocked,
            })
        );
    }
}
