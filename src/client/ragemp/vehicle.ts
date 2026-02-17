import {
    Color,
    Vector3,
    VehicleArmorType,
    VehicleBoostType,
    VehicleBrakeType,
    VehicleEngineType,
    VehicleModType,
    VehicleNeonLightType,
    VehicleNumberPlateType,
    VehiclePaintType,
    VehicleSeat,
    VehicleSuspensionType,
    VehicleTransmissionType,
    VehicleWindowTintType,
} from 'ragemp-atlas/shared';
import type { Vehicle } from '@/interfaces/vehicle';
import type { BasePed } from '@/interfaces/ped';
import { RotationOrder } from '@/enums/rotation-order';
import { RageEntity } from './entity';

export class RageVehicle extends RageEntity<VehicleMp> implements Vehicle {
    public get rotation(): Vector3 {
        const rotation = this.entity.getRotation(RotationOrder.XYZ);
        return new Vector3(rotation.x, rotation.y, rotation.z);
    }

    public set rotation(rotation: Vector3) {
        this.entity.setRotation(rotation.x, rotation.y, rotation.z, RotationOrder.XYZ, false);
    }

    public get heading(): number {
        return this.entity.getHeading();
    }

    public set heading(heading: number) {
        this.entity.setHeading(heading);
    }

    public get steerAngle(): number {
        return this.entity.steeringAngle;
    }

    public set steerAngle(steerAngle: number) {
        this.entity.steeringAngle = steerAngle;
    }

    public get engineHealth(): number {
        return this.entity.getEngineHealth();
    }

    public set engineHealth(engineHealth: number) {
        this.entity.setEngineHealth(engineHealth);
    }

    public get bodyHealth(): number {
        return this.entity.getBodyHealth();
    }

    public set bodyHealth(bodyHealth: number) {
        this.entity.setBodyHealth(bodyHealth);
    }

    public get isEngineRunning(): boolean {
        return this.entity.getIsEngineRunning();
    }

    public set isEngineRunning(isEngineRunning: boolean) {
        this.entity.setEngineOn(isEngineRunning, true, true);
    }

    public get isDrivable(): boolean {
        return this.entity.isDriveable(false);
    }

    public set isDrivable(isDrivable: boolean) {
        this.entity.setUndriveable(!isDrivable);
    }

    public get isMovable(): boolean {
        return this.entity.movable();
    }

    public set isMovable(isMovable: boolean) {
        this.isDrivable = isMovable;
    }

    public get areDoorsLocked(): boolean {
        return this.entity.getDoorsLockedForPlayer(this.entity.handle);
    }

    public set areDoorsLocked(areDoorsLocked: boolean) {
        this.entity.setDoorsLocked(areDoorsLocked ? 2 : 1);
    }

    public get primaryPaint(): VehiclePaintType {
        // TO-DO: untested
        return this.entity.getModColor1(0, 0, 0).paintType;
    }

    public set primaryPaint(primaryPaint: VehiclePaintType) {
        // TO-DO: untested
        this.entity.setModColor1(primaryPaint, this.primaryColor, 0);
    }

    public get secondaryPaint(): VehiclePaintType {
        // TO-DO: untested
        return this.entity.getModColor1(0, 0, 0).paintType;
    }

    public set secondaryPaint(secondaryPaint: VehiclePaintType) {
        // TO-DO: untested
        this.entity.setModColor2(secondaryPaint, this.secondaryColor);
    }

    public get primaryColor(): number {
        // TO-DO: untested
        return this.entity.getColours(0, 0).colorPrimary;
    }

    public set primaryColor(primaryColor: number) {
        // TO-DO: untested
        this.entity.setColours(primaryColor, this.secondaryColor);
    }

    public get secondaryColor(): number {
        // TO-DO: untested
        return this.entity.getColours(0, 0).colorPrimary;
    }

    public set secondaryColor(secondaryColor: number) {
        // TO-DO: untested
        this.entity.setColours(this.primaryColor, secondaryColor);
    }

    public get customPrimaryColor(): Color {
        const color = this.entity.getCustomPrimaryColour(0, 0, 0);
        return new Color(color.r, color.g, color.b);
    }

    public set customPrimaryColor(customPrimaryColor: Color) {
        this.entity.setCustomPrimaryColour(customPrimaryColor.red, customPrimaryColor.green, customPrimaryColor.blue);
    }

    public get customSecondaryColor(): Color {
        const color = this.entity.getCustomSecondaryColour(0, 0, 0);
        return new Color(color.r, color.g, color.b);
    }

    public set customSecondaryColor(customSecondaryColor: Color) {
        this.entity.setCustomSecondaryColour(
            customSecondaryColor.red,
            customSecondaryColor.green,
            customSecondaryColor.blue
        );
    }

    public get pearlescentColorIndex(): number {
        return this.entity.getExtraColours(0, 0).pearlescentColor;
    }

    public set pearlescentColorIndex(pearlescentColorIndex: number) {
        this.entity.setExtraColours(pearlescentColorIndex, this.wheelColorIndex);
    }

    public get wheelColorIndex(): number {
        return this.entity.getExtraColours(0, 0).wheelColor;
    }

    public set wheelColorIndex(wheelColorIndex: number) {
        this.entity.setExtraColours(this.pearlescentColorIndex, wheelColorIndex);
    }

    public get areNeonLightsActive(): boolean {
        return (
            this.entity.isNeonLightEnabled(VehicleNeonLightType.LEFT) ||
            this.entity.isNeonLightEnabled(VehicleNeonLightType.RIGHT) ||
            this.entity.isNeonLightEnabled(VehicleNeonLightType.FRONT) ||
            this.entity.isNeonLightEnabled(VehicleNeonLightType.BACK)
        );
    }

    public set areNeonLightsActive(areNeonLightsActive: boolean) {
        this.entity.setNeonLightEnabled(VehicleNeonLightType.LEFT, areNeonLightsActive);
        this.entity.setNeonLightEnabled(VehicleNeonLightType.RIGHT, areNeonLightsActive);
        this.entity.setNeonLightEnabled(VehicleNeonLightType.FRONT, areNeonLightsActive);
        this.entity.setNeonLightEnabled(VehicleNeonLightType.BACK, areNeonLightsActive);
    }

    public get neonLightsColor(): Color {
        const color = this.entity.getNeonLightsColour(0, 0, 0);
        return new Color(color.r, color.g, color.b);
    }

    public set neonLightsColor(neonLightsColor: Color) {
        this.entity.setNeonLightsColour(neonLightsColor.red, neonLightsColor.green, neonLightsColor.blue);
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
        return this.getModIndex(VehicleModType.WINDOW_TINT);
    }

    public set windowTintMod(windowTintMod: VehicleWindowTintType) {
        this.setModIndex(VehicleModType.WINDOW_TINT, windowTintMod);
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
        return this.entity.getNumberPlateText();
    }

    public set numberPlate(numberPlate: string) {
        this.entity.setNumberPlateText(numberPlate);
    }

    public get numberPlateType(): VehicleNumberPlateType {
        return this.entity.getMod(VehicleModType.PLATE_TYPE);
    }

    public set numberPlateType(numberPlateType: VehicleNumberPlateType) {
        this.entity.setMod(VehicleModType.PLATE_TYPE, numberPlateType);
    }

    public get gear(): number {
        return this.entity.gear;
    }

    public set gear(gear: number) {
        this.entity.gear = gear;
    }

    public get rpm(): number {
        return this.entity.rpm;
    }

    public set rpm(rpm: number) {
        this.entity.rpm = rpm;
    }

    public get dirtLevel(): number {
        return this.entity.getDirtLevel();
    }

    public set dirtLevel(dirtLevel: number) {
        this.entity.setDirtLevel(dirtLevel);
    }

    public get occupants(): BasePed[] {
        // TO-DO
        return [];
    }

    public repair(): void {
        // TO-DO (fix engine, body, petrol tank, tyres, windows?)
    }

    public getModIndex(modType: VehicleModType): number {
        return this.entity.getMod(modType);
    }

    public setModIndex(modType: VehicleModType, modIndex: number): void {
        this.entity.setMod(modType, modIndex);
    }

    public getOccupant(_seat: VehicleSeat): BasePed | undefined {
        // TO-DO
        // use this.entity.getPedInSeat
        return;
    }

    public setOccupant(_seat: VehicleSeat, _occupant: BasePed): void {
        // TO-DO
    }

    public toggleEngine(running: boolean): void {
        this.entity.setEngineOn(running, false, true);
    }
}
