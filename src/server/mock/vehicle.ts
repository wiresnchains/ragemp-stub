import {
    Vector3,
    Color,
    type SharedPed,
    type VehicleSpawnOptions,
    isString,
    VehiclePaintType,
    VehicleEngineType,
    VehicleBrakeType,
    VehicleTransmissionType,
    VehicleSuspensionType,
    VehicleArmorType,
    VehicleWindowTintType,
    VehicleBoostType,
    VehicleModType,
    VehicleNumberPlateType,
    VehicleSeat,
} from 'ragemp-atlas/shared';
import type { Vehicle, VehiclePool } from '@/interfaces/vehicle';
import { MockEntity, MockEntityPool } from './entity';
import type { MockPlayer } from './player';

// TO-DO: Change ped interface

export class MockVehicle extends MockEntity implements Vehicle {
    public rotation: Vector3 = new Vector3();

    public readonly steerAngle: number = 0;
    public readonly areBrakesActive: boolean = false;
    public readonly isHornActive: boolean = false;
    public readonly velocity: Vector3 = new Vector3();

    public engineHealth: number = 1000;
    public bodyHealth: number = 1000;
    public isEngineRunning: boolean = true;
    public isDrivable: boolean = true;
    public isMovable: boolean = true;
    public areDoorsLocked: boolean = false;
    public primaryPaint: VehiclePaintType = VehiclePaintType.CLASSIC;
    public secondaryPaint: VehiclePaintType = VehiclePaintType.CLASSIC;
    public primaryColor: number = 0;
    public secondaryColor: number = 0;
    public pearlescentColorIndex: number = 0;
    public wheelColorIndex: number = 0;
    public areNeonLightsActive: boolean = false;
    public neonLightsColor: Color = new Color();
    public engineMod: VehicleEngineType = VehicleEngineType.STANDARD;
    public brakeMod: VehicleBrakeType = VehicleBrakeType.STANDARD;
    public transmissionMod: VehicleTransmissionType = VehicleTransmissionType.STANDARD;
    public suspensionMod: VehicleSuspensionType = VehicleSuspensionType.STANDARD;
    public armorMod: VehicleArmorType = VehicleArmorType.NONE;
    public windowTintMod: VehicleWindowTintType = VehicleWindowTintType.NONE;
    public hasTurboMod: boolean = false;
    public boostMod: VehicleBoostType = VehicleBoostType.NONE;
    public numberPlate: string = '';
    public numberPlateType: VehicleNumberPlateType = VehicleNumberPlateType.BLUE_ON_WHITE;

    private occupantMap: Map<VehicleSeat, SharedPed> = new Map();
    private modMap: Map<VehicleModType, number> = new Map();

    private streamedPlayerSet: Set<MockPlayer> = new Set();

    public get heading(): number {
        return this.rotation.z;
    }

    public set heading(heading: number) {
        this.rotation.z = heading;
    }

    public get occupants() {
        return Array.from(this.occupantMap.values());
    }

    public get streamedPlayers(): MockPlayer[] {
        return Array.from(this.streamedPlayerSet.values());
    }

    public repair(): void {
        this.engineHealth = 1000;
        this.bodyHealth = 1000;
    }

    public getOccupant(seat: VehicleSeat): SharedPed | undefined {
        return this.occupantMap.get(seat);
    }

    public setOccupant(seat: VehicleSeat, occupant: SharedPed): void {
        this.occupantMap.set(seat, occupant);
    }

    public getModIndex(modType: VehicleModType): number {
        const index = this.modMap.get(modType);

        if (index !== undefined) {
            return index;
        }

        this.modMap.set(modType, 0);

        return 0;
    }

    public setModIndex(modType: VehicleModType, modIndex: number): void {
        this.modMap.set(modType, modIndex);
    }

    public explode(): void {
        this.isDrivable = false;
        this.engineHealth = 0;
        this.bodyHealth = 0;
    }

    public isStreamed(player: MockPlayer): boolean {
        return this.streamedPlayerSet.has(player);
    }
}

export class MockVehiclePool extends MockEntityPool<MockVehicle> implements VehiclePool {
    public spawn(model: string | number, position: Vector3, options: VehicleSpawnOptions = {}): MockVehicle {
        const vehicle = this.createEntity();

        if (isString(model)) {
            vehicle.model = this.container.joaat(model);
        } else {
            vehicle.model = model;
        }

        vehicle.position = position;
        vehicle.dimension = options.dimension ?? vehicle.dimension;
        vehicle.heading = options.heading ?? vehicle.heading;
        vehicle.numberPlate = options.numberPlate ?? vehicle.numberPlate;
        vehicle.isEngineRunning = options.isEngineRunning ?? vehicle.isEngineRunning;
        vehicle.areDoorsLocked = options.areDoorsLocked ?? vehicle.areDoorsLocked;

        return vehicle;
    }
}
