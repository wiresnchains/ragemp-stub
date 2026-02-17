import type { VehicleSeat } from '../enums/vehicle';
import type { SharedEntity } from './entity';
import type { SharedVehicle } from './vehicle';

export interface SharedPlayer extends SharedEntity {
    /**
     * Heading of the player.
     *
     * Alias for the Z-axis of the rotation.
     */
    heading: number;

    /**
     * Health of the player.
     */
    health: number;

    /**
     * Armour of the player.
     */
    armour: number;

    /**
     * The vehicle that the player is currently sitting in.
     */
    readonly vehicle?: SharedVehicle;

    /**
     * The vehicle seat that the player is currently in.
     */
    readonly seat?: VehicleSeat;

    /**
     * Places the current player in the given vehicle in the given seat.
     * @param vehicle Target vehicle.
     * @param seat Target seat.
     */
    placeInVehicle(vehicle: SharedVehicle, seat: VehicleSeat): void;
}
