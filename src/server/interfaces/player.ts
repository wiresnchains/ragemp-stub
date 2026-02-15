import type { VehicleSeat } from '@/enums';
import type { Entity, EntityPool } from './entity';
import type { Vehicle } from './vehicle';

export interface Player extends Entity {
    /**
     * IP address of the player.
     */
    readonly ip: string;

    /**
     * Ping of the player in milliseconds.
     */
    readonly ping: number;

    /**
     * Packet loss of the player.
     */
    readonly packetLoss: number;

    /**
     * An array of the players that are currently streamed to the current player.
     */
    readonly streamedPlayers: Player[];

    /**
     * An array of the players that can hear current player's voice stream.
     */
    readonly voiceListeners: Player[];

    /**
     * Player's social club username.
     */
    readonly socialClub: string;

    /**
     * The vehicle that the player is currently sitting in.
     */
    readonly vehicle?: Vehicle;

    /**
     * The vehicle seat that the player is currently in.
     */
    readonly seat?: VehicleSeat;

    /**
     * Health of the player.
     */
    health: number;

    /**
     * Armour of the player.
     */
    armour: number;

    /**
     * Heading (direction) of the player.
     */
    heading: number;

    /**
     * Calls the client-side event.
     * @param eventName Name of the event.
     * @param args List of parameters.
     */
    call(eventName: string, ...args: any[]): void;

    /**
     * Calls the client-side event using a remote procedure call, expecting to receive an answer.
     * @param eventName Name of the event.
     * @param args List of parameters.
     */
    callRpc<T>(eventName: string, ...args: any[]): Promise<T>;

    /**
     * Enables the voice stream for the given player.
     * @param player Target player.
     */
    startVoiceStreamFor(player: Player): void;

    /**
     * Disables the voice stream for the given player.
     * @param player Target player.
     */
    endVoiceStreamFor(player: Player): void;

    /**
     * Checks whether or not the given player is currently being streamed to the current player.
     * @param player Target player.
     */
    isStreamed(player: Player): boolean;

    /**
     * Places the current player in the given vehicle in the given seat.
     * @param vehicle Target vehicle.
     * @param seat Target seat.
     */
    placeInVehicle(vehicle: Vehicle, seat: VehicleSeat): void;
}

export interface PlayerPool<T extends Player = Player> extends EntityPool<T> {
    /**
     * Calls the client-side event for all players.
     * @param eventName Name of the event.
     * @param args List of parameters.
     */
    call(eventName: string, ...args: any[]): void;

    /**
     * Calls the client-side event for all players in the given dimension.
     * @param dimension Target dimension.
     * @param eventName Name of the event.
     * @param args List of parameters.
     */
    call(dimension: number, eventName: string, ...args: any[]): void;

    /**
     * Calls the client-side event for all players in the given range.
     * @param position Center point to check from.
     * @param range Range from the center point.
     * @param eventName Name of the event.
     * @param args List of parameters.
     */
    call(position: Vector3, range: number, eventName: string, ...args: any[]): void;

    /**
     * Calls the client-side event for all players in the given dimension in the given range.
     * @param position Center point to check from.
     * @param range Range from the center point.
     * @param dimension Target dimension.
     * @param eventName Name of the event.
     * @param args List of parameters.
     */
    call(position: Vector3, range: number, dimension: number, eventName: string, ...args: any[]): void;
}
