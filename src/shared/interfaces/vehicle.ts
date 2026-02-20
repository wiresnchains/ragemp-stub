import type { Color } from '../utils/color';
import type { Vector3 } from '../utils/vector';
import type { SharedEntity, SharedEntityPool } from './entity';
import type {
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
} from '../enums/vehicle';

export interface SharedVehicle extends SharedEntity {
    /**
     * Rotation of the vehicle.
     */
    rotation: Vector3;

    /**
     * Heading of the vehicle.
     *
     * Alias for the Z-axis of the rotation.
     */
    heading: number;

    /**
     * Current steer angle of the vehicle.
     */
    steerAngle: number;

    /**
     * Engine health of the vehicle.
     */
    engineHealth: number;

    /**
     * Structural health of the vehicle.
     */
    bodyHealth: number;

    /**
     * Whether or not the engine is on.
     */
    isEngineRunning: boolean;

    /**
     * Whether or not the vehicle is drivable.
     */
    isDrivable: boolean;

    /**
     * Whether or not the vehicle is movable.
     */
    isMovable: boolean;

    /**
     * Whether or not the doors are locked.
     */
    areDoorsLocked: boolean;

    /**
     * Primary paint type of the vehicle.
     */
    primaryPaint: VehiclePaintType;

    /**
     * Secondary paint type of the vehicle.
     */
    secondaryPaint: VehiclePaintType;

    /**
     * Primary color of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    primaryColor: number;

    /**
     * Secondary color of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    secondaryColor: number;

    /**
     * Custom primary color of the vehicle.
     */
    customPrimaryColor?: Color;

    /**
     * Custom secondary color of the vehicle.
     */
    customSecondaryColor?: Color;

    /**
     * Pearlescent color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    pearlescentColorIndex: number;

    /**
     * Wheel color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    wheelColorIndex: number;

    /**
     * Whether or not the neon lights are on.
     */
    areNeonLightsActive: boolean;

    /**
     * Custom color of the neon lights.
     */
    neonLightsColor: Color;

    /**
     * Engine modification of the vehicle.
     */
    engineMod: VehicleEngineType;

    /**
     * Brake modification of the vehicle.
     */
    brakeMod: VehicleBrakeType;

    /**
     * Transmission modification of the vehicle.
     */
    transmissionMod: VehicleTransmissionType;

    /**
     * Suspension modification of the vehicle.
     */
    suspensionMod: VehicleSuspensionType;

    /**
     * Armor modification of the vehicle.
     */
    armorMod: VehicleArmorType;

    /**
     * Window tint modification of the vehicle.
     */
    windowTintMod: VehicleWindowTintType;

    /**
     * Whether or not the vehicle has turbo modification installed.
     */
    hasTurboMod: boolean;

    /**
     * Boost modification of the vehicle.
     */
    boostMod: VehicleBoostType;

    /**
     * The number plate of the vehicle.
     */
    numberPlate: string;

    /**
     * The number plate type of the vehicle.
     */
    numberPlateType: VehicleNumberPlateType;

    /**
     * Repairs both the structual and mechanical damage on the vehicle.
     */
    repair(): void;

    /**
     * Gets the modification index of the vehicle.
     * @param modType Modification type index.
     */
    getModIndex(modType: VehicleModType): number;

    /**
     * Sets the modification index of the vehicle.
     * @param modType Modification type index.
     * @param modIndex New modification index.
     */
    setModIndex(modType: VehicleModType, modIndex: number): void;
}

export interface VehicleSpawnOptions extends Partial<{
    dimension?: number;
    heading?: number;
    numberPlate?: string;
    isEngineRunning?: boolean;
    areDoorsLocked?: boolean;
}> {}

export interface SharedVehiclePool<TEntity extends SharedVehicle> extends SharedEntityPool<TEntity> {
    spawn(model: string | number, position: Vector3, options?: VehicleSpawnOptions): TEntity;
}
