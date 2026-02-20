import type { SharedPlayer } from 'ragemp-stub/shared';
import type { Entity, EntityPool } from './entity';

export interface Player extends Entity, SharedPlayer {
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
     * Health of the current player.
     */
    health: number;

    /**
     * Armor of the current player.
     */
    armor: number;

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
     * Kicks the current player from the server.
     */
    kick(): void;

    /**
     * Checks whether or not the given player is currently being streamed to the current player.
     * @param player Target player.
     */
    isStreamed(player: Player): boolean;
}

export interface PlayerPool extends EntityPool<Player> {
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
