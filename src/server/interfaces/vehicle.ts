import type { SharedVehicle, SharedVehiclePool, Vector3 } from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from './entity';
import type { Player } from './player';

export interface Vehicle extends Entity, SharedVehicle {
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
     * An array of all players that the vehicle is currently being streamed to.
     */
    readonly streamedPlayers: Player[];

    /**
     * The velocity of the vehicle.
     */
    readonly velocity: Vector3;

    readonly engineHealth: number;

    /**
     * Explodes the vehicle.
     */
    explode(): void;

    /**
     * Checks whether or not the current vehicle is currently being streaned to the given player.
     * @param player Target player.
     */
    isStreamed(player: Player): boolean;
}

export interface VehiclePool extends EntityPool<Vehicle>, SharedVehiclePool<Vehicle> {}
