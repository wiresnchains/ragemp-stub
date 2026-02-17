import type { SharedVehicle, SharedVehiclePool, VehicleSeat } from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from './entity';
import type { BasePed } from './ped';

export interface Vehicle extends Entity, SharedVehicle {
    /**
     * The gear that the vehicle transmission is currently in.
     */
    gear: number;

    /**
     * The RPM of the vehicle's engine.
     */
    rpm: number;

    /**
     * Level of dirt on the vehicle.
     */
    dirtLevel: number;

    /**
     * A list of all occupants in the vehicle.
     */
    readonly occupants: BasePed[];

    /**
     * Returns the ped that is currently in the given seat.
     * @param seat Target seat.
     */
    getOccupant(seat: VehicleSeat): BasePed | undefined;

    /**
     * Places the given ped in the given seat.
     * @param seat Target seat.
     * @param occupant Target ped.
     */
    setOccupant(seat: VehicleSeat, occupant: BasePed): void;

    /**
     * Turns the engine on or off with a short starter delay.
     *
     * Use `vehicle.isEngineRunning` attribute to toggle the engine instantly.
     * @param running Whether or not the engine should be running.
     */
    toggleEngine(running: boolean): void;
}

export interface VehiclePool extends EntityPool<Vehicle>, SharedVehiclePool<Vehicle> {}
