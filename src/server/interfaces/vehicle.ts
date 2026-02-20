import type { SharedVehicle, SharedVehiclePool, Vector3, VehicleSeat } from 'ragemp-stub/shared';
import type { Entity, EntityPool } from './entity';
import type { Player } from './player';

export interface Vehicle extends Entity, SharedVehicle {
    readonly steerAngle: number;

    readonly engineHealth: number;

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

    /**
     * A list of all players in the vehicle.
     */
    readonly occupants: Player[];

    /**
     * Explodes the vehicle.
     */
    explode(): void;

    /**
     * Returns the player that is currently in the given seat.
     * @param seat Target seat.
     */
    getOccupant(seat: VehicleSeat): Player | undefined;

    /**
     * Places the given player in the given seat.
     * @param seat Target seat.
     * @param occupant Target player.
     */
    setOccupant(seat: VehicleSeat, occupant: Player): void;

    /**
     * Checks whether or not the current vehicle is currently being streaned to the given player.
     * @param player Target player.
     */
    isStreamed(player: Player): boolean;
}

export interface VehiclePool extends EntityPool<Vehicle>, SharedVehiclePool<Vehicle> {}
