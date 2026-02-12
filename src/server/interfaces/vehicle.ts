import type { Color, Vector3 } from 'ragemp-atlas/shared';
import type { Entity } from './entity';
import type { Player } from './player';
import type { VehicleNumberPlateType, VehiclePaint, VehicleSeat } from '../enums';

export interface Vehicle extends Entity {
    readonly engineHealth: number;

    readonly steerAngle: number;

    readonly areBrakesActive: boolean;

    readonly isHornActive: boolean;

    readonly areHighbeamsActive: boolean;

    readonly sirenActive: boolean;

    readonly streamedPlayers: Player[];

    readonly trailer?: Vehicle;

    readonly traileredBy?: Vehicle;

    readonly velocity: Vector3;

    bodyHealth: number;

    rotation: Vector3;

    isDestroyed: boolean;

    isEngineRunning: boolean;

    isLocked: boolean;

    isMoveable: boolean;

    neonLightsActive: boolean;

    taxiLightsActive: boolean;

    controlledBy?: Player;

    numberPlate: string;

    numberPlateType: VehicleNumberPlateType;

    pearlescentColor: number;

    dashboardColor: number;

    trimColor: number;

    wheelColor: number;

    windowTint: number;

    primaryPaint: VehiclePaint;

    primaryColor: Color;

    secondaryPaint: VehiclePaint;

    secondaryColor: Color;

    neonColor: Color;

    explode(): void;

    repair(): void;

    getOccupant(seat: VehicleSeat): Player | undefined;

    getOccupants(): Player[];

    setOccupant(seat: VehicleSeat, player: Player): void;

    isStreamed(player: Player): boolean;
}
