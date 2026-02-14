import type { Vector3 } from 'ragemp-atlas/shared';
import type { Entity } from './entity';
import type { Player } from './player';
import type { VehicleNumberPlateType, VehiclePaint, VehicleSeat } from '../enums';

export interface Vehicle extends Entity {
    /**
     * The engine health of the vehicle.
     */
    readonly engineHealth: number;

    /**
     * Current steer angle of the vehicle.
     */
    readonly steerAngle: number;

    /**
     * Whether or not the driver is pressing the brake.
     */
    readonly areBrakesActive: boolean;

    /**
     * Whether or not the driver is pressing the horn.
     */
    readonly isHornActive: boolean;

    /**
     * Whether or not the highbeam lights are active.
     */
    readonly areHighbeamsActive: boolean;

    /**
     * Whether or not the siren is active.
     */
    readonly isSirenActive: boolean;

    /**
     * An array of all players that the vehicle is currently being streamed to.
     */
    readonly streamedPlayers: Player[];

    /**
     * An array of all players that are currently in the vehicle.
     */
    readonly occupants: Player[];

    /**
     * The vehicle that is being used as a trailer to the current vehicle.
     */
    readonly trailer?: Vehicle;

    /**
     * The vehicle that is using the current vehicle as a trailer.
     */
    readonly traileredBy?: Vehicle;

    /**
     * The velocity of the vehicle.
     */
    readonly velocity: Vector3;

    /**
     * The body health of the vehicle.
     */
    bodyHealth: number;

    /**
     * Rotation of the vehicle.
     */
    rotation: Vector3;

    /**
     * Whether or not the vehicle is destroyed.
     */
    isDestroyed: boolean;

    /**
     * Whether or not the engine is running.
     */
    isEngineRunning: boolean;

    /**
     * Whether or not the doors are locked.
     */
    isLocked: boolean;

    /**
     * Whether or not the vehicle is moveable.
     */
    isMoveable: boolean;

    /**
     * Whether or not the neon lights are active.
     */
    areNeonLightsActive: boolean;

    /**
     * Whether or not the taxi lights are active.
     */
    areTaxiLightsActive: boolean;

    /**
     * The driver of the vehicle.
     */
    controlledBy?: Player;

    /**
     * The number plate of the vehicle.
     */
    numberPlate: string;

    /**
     * The number plate type of the vehicle.
     */
    numberPlateType: VehicleNumberPlateType;

    /**
     * Dashboard color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    dashboardColor: number;

    /**
     * Trim color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    trimColor: number;

    /**
     * Wheel color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    wheelColor: number;

    /**
     * Window tint of the vehicle.
     *
     * Uses values ranging from 1 to 255.
     */
    windowTint: number;

    /**
     * Primary paint type of the vehicle.
     */
    primaryPaint: VehiclePaint;

    /**
     * Secondary paint type of the vehicle.
     */
    secondaryPaint: VehiclePaint;

    /**
     * Primary color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    primaryColor: number;

    /**
     * Secondary color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    secondaryColor: number;

    /**
     * Pearlescent color index of the vehicle.
     *
     * Use the [color index](https://wiki.rage.mp/wiki/Vehicle_Colors).
     */
    pearlescentColor: number;

    /**
     * Explodes the vehicle.
     */
    explode(): void;

    /**
     * Repairs the vehicle.
     */
    repair(): void;

    /**
     * Returns the player that is in the given seat.
     * @param seat Target seat.
     */
    getOccupant(seat: VehicleSeat): Player | undefined;

    /**
     * Places the given player in the current vehicle in the given seat.
     * @param seat Target seat.
     * @param player Target player.
     */
    setOccupant(seat: VehicleSeat, player: Player): void;

    /**
     * Updates the primary color of the vehicle using the given RGB values.
     * @param red Ranging from 0 to 255.
     * @param green Ranging from 0 to 255.
     * @param blue Ranging from 0 to 255.
     */
    setPrimaryColorRGB(red: number, green: number, blue: number): void;

    /**
     * Updates the secondary color of the vehicle using the given RGB values.
     * @param red Ranging from 0 to 255.
     * @param green Ranging from 0 to 255.
     * @param blue Ranging from 0 to 255.
     */
    setSecondaryColorRGB(red: number, green: number, blue: number): void;

    /**
     * Updates the neon color of the vehicle using the given RGB values.
     * @param red Ranging from 0 to 255.
     * @param green Ranging from 0 to 255.
     * @param blue Ranging from 0 to 255.
     */
    setNeonColorRGB(red: number, green: number, blue: number): void;

    /**
     * Checks whether or not the current vehicle is currently being streaned to the given player.
     * @param player Target player.
     */
    isStreamed(player: Player): boolean;
}
