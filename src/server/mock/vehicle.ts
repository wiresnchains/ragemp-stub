import { joaat, Vector3 } from 'ragemp-atlas/shared';
import type { Vehicle, VehiclePool, VehicleSpawnOptions } from '@/interfaces/vehicle';
import { VehicleNumberPlateType, VehiclePaint, VehicleSeat } from '@/enums';
import { MockEntity, MockEntityPool } from './entity';
import type { MockPlayer } from './player';
import type { MockContainer } from '@/container';

export class MockVehicle extends MockEntity implements Vehicle {
    public readonly engineHealth: number;
    public readonly steerAngle: number;
    public readonly areBrakesActive: boolean;
    public readonly isHornActive: boolean;
    public readonly areHighbeamsActive: boolean;
    public readonly isSirenActive: boolean;
    public readonly trailer?: Vehicle | undefined;
    public readonly traileredBy?: Vehicle | undefined;
    public readonly velocity: Vector3;

    public get streamedPlayers(): MockPlayer[] {
        return Array.from(this.streamedPlayersSet.values());
    }

    public get occupants(): MockPlayer[] {
        return Array.from(this.seats.values());
    }

    public heading: number;
    public bodyHealth: number;
    public rotation: Vector3;
    public isDestroyed: boolean;
    public isEngineRunning: boolean;
    public isLocked: boolean;
    public isMoveable: boolean;
    public areNeonLightsActive: boolean;
    public areTaxiLightsActive: boolean;
    public controlledBy?: MockPlayer | undefined;
    public numberPlate: string;
    public numberPlateType: VehicleNumberPlateType;
    public dashboardColor: number;
    public trimColor: number;
    public wheelColor: number;
    public windowTint: number;
    public primaryPaint: number;
    public secondaryPaint: number;
    public primaryColor: number;
    public secondaryColor: number;
    public pearlescentColor: number;

    private seats: Map<VehicleSeat, MockPlayer>;
    private streamedPlayersSet: Set<MockPlayer>;

    public constructor(container: MockContainer, id: number) {
        super(container, id);

        this.seats = new Map();
        this.streamedPlayersSet = new Set();

        this.engineHealth = 100;
        this.steerAngle = 0;
        this.areBrakesActive = false;
        this.isHornActive = false;
        this.areHighbeamsActive = false;
        this.isSirenActive = false;
        this.velocity = new Vector3();

        this.heading = 0;
        this.bodyHealth = 100;
        this.rotation = new Vector3();
        this.isDestroyed = false;
        this.isEngineRunning = true;
        this.isLocked = false;
        this.isMoveable = true;
        this.areNeonLightsActive = false;
        this.areTaxiLightsActive = false;
        this.numberPlate = '';
        this.numberPlateType = VehicleNumberPlateType.BLUE_ON_WHITE;
        this.dashboardColor = 0;
        this.trimColor = 0;
        this.wheelColor = 0;
        this.windowTint = 0;
        this.primaryPaint = VehiclePaint.CLASSIC;
        this.secondaryPaint = VehiclePaint.CLASSIC;
        this.primaryColor = 0;
        this.secondaryColor = 0;
        this.pearlescentColor = 0;
    }

    public explode(): void {}

    public repair(): void {}

    public getOccupant(seat: VehicleSeat): MockPlayer | undefined {
        return this.seats.get(seat);
    }

    public setOccupant(seat: VehicleSeat, player: MockPlayer): void {
        player.vehicle = this;
        player.seat = seat;
        this.seats.set(seat, player);
    }

    public setPrimaryColorRGB(red: number, green: number, blue: number): void {}

    public setSecondaryColorRGB(red: number, green: number, blue: number): void {}

    public setNeonColorRGB(red: number, green: number, blue: number): void {}

    public isStreamed(player: MockPlayer): boolean {
        return this.streamedPlayersSet.has(player);
    }
}

export class MockVehiclePool extends MockEntityPool<MockVehicle> implements VehiclePool<MockVehicle> {
    public spawn(model: string | number, position: Vector3, options: VehicleSpawnOptions = {}): MockVehicle {
        const vehicle = this.createEntity();

        vehicle.model = typeof model === 'string' ? joaat(model) : model;
        vehicle.position = position;
        vehicle.dimension = options.dimension ?? vehicle.dimension;
        vehicle.heading = options.heading ?? vehicle.heading;
        vehicle.numberPlate = options.numberPlate ?? vehicle.numberPlate;
        vehicle.isEngineRunning = options.isEngineRunning ?? vehicle.isEngineRunning;
        vehicle.isLocked = options.isLocked ?? vehicle.isLocked;

        return vehicle;
    }
}
