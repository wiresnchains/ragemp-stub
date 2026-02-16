import {
    VehicleArmorType,
    VehicleBoostType,
    VehicleBrakeType,
    VehicleEngineType,
    VehicleModType,
    VehicleNumberPlateType,
    VehiclePaintType,
    VehicleSuspensionType,
    VehicleTransmissionType,
    VehicleWindowTintType,
    type VehicleSeat,
} from '../enums/vehicle';
import type { SharedPed } from '../interfaces/ped';
import type { SharedVehicle } from '../interfaces/vehicle';
import { Color } from '../utils/color';
import { SharedMockEntity } from './entity';

export class SharedMockVehicle<TContainer> extends SharedMockEntity<TContainer> implements SharedVehicle {
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
    public boostMod: VehicleBoostType = VehicleBoostType.NONE;
    public numberPlate: string = '';
    public numberPlateType: VehicleNumberPlateType = VehicleNumberPlateType.BLUE_ON_WHITE;

    private occupantMap: Map<VehicleSeat, SharedPed> = new Map();
    private modMap: Map<VehicleModType, number> = new Map();

    public constructor(container: TContainer, id: number) {
        super(container, id);
    }

    public get occupants() {
        return Array.from(this.occupantMap.values());
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
}
