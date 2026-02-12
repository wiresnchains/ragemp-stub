import type { Entity } from './entity';
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
    vehicle?: Vehicle;

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
    callRPC<T>(eventName: string, ...args: any[]): Promise<T>;

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
}
