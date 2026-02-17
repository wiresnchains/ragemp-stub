import {
    VehicleSeat,
    VehicleModType,
    VehicleWindowTintType,
    VehicleEngineType,
    VehicleBrakeType,
    VehicleTransmissionType,
    VehicleSuspensionType,
    VehicleArmorType,
    VehicleBoostType,
    VehicleNumberPlateType,
    VehiclePaintType,
    Vector3,
    Color,
    type SharedPed,
    type VehicleSpawnOptions,
} from 'ragemp-atlas/shared';
import type { Vehicle, VehiclePool } from '@/interfaces/vehicle';
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

    public get rotation(): Vector3 {
        const rotation = this.entity.rotation;
        return new Vector3(rotation.x, rotation.y, rotation.z);
    }

    public set rotation(rotation: Vector3) {
        this.entity.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z);
    }

    public get heading(): number {
        return this.entity.heading;
    }

    public set heading(heading: number) {
        this.entity.rotation = new mp.Vector3(this.entity.rotation.x, this.entity.rotation.y, heading);
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

    public get streamedPlayers(): RagePlayer[] {
        return this.entity.streamedPlayers.map(RagePlayer.fromPlayer);
    }

    public get velocity(): Vector3 {
        const velocity = this.entity.velocity;
        return new Vector3(velocity.x, velocity.y, velocity.z);
    }

    public get occupants(): SharedPed[] {
        return this.entity.getOccupants().map(RagePlayer.fromPlayer);
    }

    public get engineHealth(): number {
        return this.entity.engineHealth;
    }

    public get bodyHealth(): number {
        return this.entity.bodyHealth;
    }

    public set bodyHealth(bodyHealth: number) {
        this.entity.bodyHealth = bodyHealth;
    }

    public get isEngineRunning(): boolean {
        return this.entity.engine;
    }

    public set isEngineRunning(isEngineRunning: boolean) {
        this.entity.engine = isEngineRunning;
    }

    public get isDrivable(): boolean {
        return this.entity.dead;
    }

    public set isDrivable(isDrivable: boolean) {
        this.entity.dead = isDrivable;
    }

    public get isMovable(): boolean {
        return this.entity.movable;
    }

    public set isMovable(isMovable: boolean) {
        this.entity.movable = isMovable;
    }

    public get areDoorsLocked(): boolean {
        return this.entity.locked;
    }

    public set areDoorsLocked(areDoorsLocked: boolean) {
        this.entity.locked = areDoorsLocked;
    }

    public get primaryPaint(): VehiclePaintType {
        return this.entity.getPaint(0);
    }

    public set primaryPaint(primaryPaint: VehiclePaintType) {
        this.entity.setPaint(primaryPaint, this.primaryColor, this.secondaryPaint, this.secondaryColor);
    }

    public get secondaryPaint(): VehiclePaintType {
        return this.entity.getPaint(1);
    }

    public set secondaryPaint(secondaryPaint: VehiclePaintType) {
        this.entity.setPaint(this.primaryPaint, this.primaryColor, secondaryPaint, this.secondaryColor);
    }

    public get primaryColor(): number {
        return this.entity.getColor(0);
    }

    public set primaryColor(primaryColor: number) {
        this.entity.setColor(primaryColor, this.secondaryColor);
    }

    public get secondaryColor(): number {
        return this.entity.getColor(1);
    }

    public set secondaryColor(secondaryColor: number) {
        this.entity.setColor(this.primaryColor, secondaryColor);
    }

    public get customPrimaryColor(): Color | undefined {
        const color = this.entity.getColorRGB(0);
        if (color === null) {
            return;
        }

        return new Color(color[0], color[1], color[2]);
    }

    public set customPrimaryColor(customPrimaryColor: Color | undefined) {
        if (!customPrimaryColor) {
            return;
        }

        this.entity.setColorRGB(
            customPrimaryColor.red,
            customPrimaryColor.green,
            customPrimaryColor.blue,
            this.customSecondaryColor?.red ?? 0,
            this.customSecondaryColor?.green ?? 0,
            this.customSecondaryColor?.blue ?? 0
        );
    }

    public get customSecondaryColor(): Color | undefined {
        const color = this.entity.getColorRGB(1);
        if (color === null) {
            return;
        }

        return new Color(color[0], color[1], color[2]);
    }

    public set customSecondaryColor(customSecondaryColor: Color | undefined) {
        if (!customSecondaryColor) {
            return;
        }

        this.entity.setColorRGB(
            this.customPrimaryColor?.red ?? 0,
            this.customPrimaryColor?.green ?? 0,
            this.customPrimaryColor?.blue ?? 0,
            customSecondaryColor.red,
            customSecondaryColor.green,
            customSecondaryColor.blue
        );
    }

    public get pearlescentColorIndex(): number {
        return this.entity.pearlescentColor;
    }

    public set pearlescentColorIndex(pearlescentColorIndex: number) {
        this.entity.pearlescentColor = pearlescentColorIndex;
    }

    public get wheelColorIndex(): number {
        return this.entity.wheelColor;
    }

    public set wheelColorIndex(wheelColorIndex: number) {
        this.entity.wheelColor = wheelColorIndex;
    }

    public get areNeonLightsActive(): boolean {
        return this.entity.neonEnabled;
    }

    public set areNeonLightsActive(areNeonLightsActive: boolean) {
        this.entity.neonEnabled = areNeonLightsActive;
    }

    public get neonLightsColor(): Color {
        // TO-DO: untested
        const color = this.entity.getNeonColor();
        return new Color(color[0], color[1], color[2]);
    }

    public set neonLightsColor(neonLightsColor: Color) {
        this.entity.setNeonColor(neonLightsColor.red, neonLightsColor.green, neonLightsColor.blue);
    }

    public get engineMod(): VehicleEngineType {
        return this.getModIndex(VehicleModType.ENGINE);
    }

    public set engineMod(engineMod: VehicleEngineType) {
        this.setModIndex(VehicleModType.ENGINE, engineMod);
    }

    public get brakeMod(): VehicleBrakeType {
        return this.getModIndex(VehicleModType.BRAKES);
    }

    public set brakeMod(brakeMod: VehicleBrakeType) {
        this.setModIndex(VehicleModType.BRAKES, brakeMod);
    }

    public get transmissionMod(): VehicleTransmissionType {
        return this.getModIndex(VehicleModType.TRANSMISSION);
    }

    public set transmissionMod(transmissionMod: VehicleTransmissionType) {
        this.setModIndex(VehicleModType.TRANSMISSION, transmissionMod);
    }

    public get suspensionMod(): VehicleSuspensionType {
        return this.getModIndex(VehicleModType.SUSPENSION);
    }

    public set suspensionMod(suspensionMod: VehicleSuspensionType) {
        this.setModIndex(VehicleModType.SUSPENSION, suspensionMod);
    }

    public get armorMod(): VehicleArmorType {
        return this.getModIndex(VehicleModType.ARMOR);
    }

    public set armorMod(armorMod: VehicleArmorType) {
        this.setModIndex(VehicleModType.ARMOR, armorMod);
    }

    public get windowTintMod(): VehicleWindowTintType {
        return this.entity.windowTint;
    }

    public set windowTintMod(windowTintMod: VehicleWindowTintType) {
        this.entity.windowTint = windowTintMod;
    }

    public get hasTurboMod(): boolean {
        return this.getModIndex(VehicleModType.TURBO) === 0;
    }

    public set hasTurboMod(hasTurboMod: boolean) {
        this.setModIndex(VehicleModType.TURBO, hasTurboMod ? 0 : -1);
    }

    public get boostMod(): VehicleBoostType {
        return this.getModIndex(VehicleModType.BOOST);
    }

    public set boostMod(boostMod: VehicleBoostType) {
        this.setModIndex(VehicleModType.BOOST, boostMod);
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

    public repair(): void {
        this.entity.repair();
    }

    public getOccupant(_seat: VehicleSeat): SharedPed | undefined {
        // TO-DO: Waiting for ped implementation
        // Use: this.entity.getOccupant
        return;
    }

    public setOccupant(_seat: VehicleSeat, _occupant: SharedPed): void {
        // TO-DO: Waiting for ped implementation
    }

    public getModIndex(modType: VehicleModType): number {
        return this.entity.getMod(modType);
    }

    public setModIndex(modType: VehicleModType, modIndex: number): void {
        this.entity.setMod(modType, modIndex);
    }

    public explode(): void {
        this.entity.explode();
    }

    public isStreamed(player: RagePlayer): boolean {
        return this.entity.isStreamed(player.entity);
    }
}

export class RageVehiclePool extends RageEntityPool<VehicleMp, VehicleMpPool, RageVehicle> implements VehiclePool {
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
                locked: options.areDoorsLocked,
            })
        );
    }
}
