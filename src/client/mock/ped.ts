import {
    isString,
    PedComponentType,
    PedFaceFeatureType,
    PedHeadOverlayType,
    PedPropType,
    Vector3,
} from 'ragemp-stub/shared';
import type { BasePed, Ped, PedPool } from '@/interfaces/ped';
import { PedDeathType, PedFlagType, type PedBoneType } from '@/enums/ped';
import { MockEntity, MockEntityPool } from './entity';
import type { MockClientContainer } from './container';

// TO-DO: so many to-do's here
export class MockBasePed extends MockEntity implements BasePed {
    public readonly canRagdoll: boolean = true;
    public money: number = 0;
    public armor: number = 0;

    private configFlags: Map<PedFlagType, boolean> = new Map();
    private headOverlay: Map<PedHeadOverlayType, MockBasePedHeadOverlay> = new Map();
    private headBlend: MockBasePedHeadBlend = new MockBasePedHeadBlend(0, 0, 0, 0, 0, 0);
    private faceFeatures: Map<PedFaceFeatureType, number> = new Map();
    private props: Map<PedPropType, MockBasePedProp> = new Map();
    private components: Map<PedComponentType, MockBasePedComponent> = new Map();
    private eyeColor: number = 0;
    private hairColor: MockBasePedHairColor = new MockBasePedHairColor(0, 0);
    private wetnessHeight: number = 0;

    public get heading(): number {
        return this.rotation.z;
    }

    public set heading(heading: number) {
        this.rotation.z = heading;
    }

    public applyDamage(amount: number, includeArmor: boolean): void {
        let amountLeft = amount;

        if (includeArmor) {
            if (this.armor <= amountLeft) {
                amountLeft -= this.armor;
                this.armor = 0;
            } else {
                this.armor -= amountLeft;
                return;
            }
        }

        this.health -= amountLeft;
    }

    public canSeeTarget(_targetHandle: number): boolean {
        // TO-DO: can't do it without camera abstractions :(
        return false;
    }

    public clone(): number {
        // TO-DO: I don't even know how to replicate this behaviour for now
        return 0;
    }

    public get3dBoneCoords(_bone: PedBoneType, offset?: Vector3): Vector3 {
        // TO-DO: ideally we want to replicate real bone coordinates based of off entity position?
        let coords = this.position;

        if (offset) {
            coords = coords.add(offset); // TO-DO: test real behaviour (add/sub)
        }

        return coords;
    }

    public getBoneIndex(_bone: PedBoneType): number {
        // TO-DO: https://wiki.rage.mp/wiki/Bones
        return 0;
    }

    public getCauseOfDeath(): PedDeathType {
        // TO-DO: what should it return if the ped hasn't died at all?
        return PedDeathType.WEAPON_FALL;
    }

    public getConfigFlag(flagType: PedFlagType): boolean {
        return this.configFlags.get(flagType) || false;
    }

    public setConfigFlag(flagType: PedFlagType, state: boolean): void {
        this.configFlags.set(flagType, state);
    }

    public getHeadOverlay(overlayType: PedHeadOverlayType): number {
        const headOverlay = this.headOverlay.get(overlayType);

        if (!headOverlay) {
            return 0;
        }

        return headOverlay.index;
    }

    public setHeadOverlay(
        overlayType: PedHeadOverlayType,
        index: number,
        opacity: number,
        firstColor: number,
        secondColor: number
    ): void {
        this.headOverlay.set(overlayType, new MockBasePedHeadOverlay(index, opacity, firstColor, secondColor));
    }

    public getHeadBlend(): MockBasePedHeadBlend {
        return this.headBlend;
    }

    public setHeadBlend(
        shapeFirst: number,
        shapeSecond: number,
        skinFirst: number,
        skinSecond: number,
        shapeMix: number,
        skinMix: number
    ): void {
        this.headBlend = new MockBasePedHeadBlend(shapeFirst, shapeSecond, skinFirst, skinSecond, shapeMix, skinMix);
    }

    public getFaceFeature(faceFeature: PedFaceFeatureType): number {
        return this.faceFeatures.get(faceFeature) || 0;
    }

    public setFaceFeature(faceFeature: PedFaceFeatureType, scale: number): void {
        this.faceFeatures.set(faceFeature, scale);
    }

    public getPropDrawable(propType: PedPropType): number {
        const prop = this.props.get(propType);

        if (!prop) {
            return 255;
        }

        return prop.drawableIndex;
    }

    public getPropTexture(propType: PedPropType): number {
        const prop = this.props.get(propType);

        if (!prop) {
            return 255;
        }

        return prop.textureIndex;
    }

    public setProp(propType: PedPropType, drawableIndex: number, textureIndex: number): void {
        this.props.set(propType, new MockBasePedProp(drawableIndex, textureIndex));
    }

    public clearProp(propType: PedPropType): void {
        this.props.delete(propType);
    }

    public clearProps(): void {
        this.props.clear();
    }

    public setRandomProps(): void {
        // TO-DO
    }

    public getComponent(componentType: PedComponentType): MockBasePedComponent {
        return this.components.get(componentType) || new MockBasePedComponent(0, 0, 0);
    }

    public setComponent(
        componentType: PedComponentType,
        drawableIndex: number,
        textureIndex: number,
        paletteIndex: number
    ): void {
        this.components.set(componentType, new MockBasePedComponent(drawableIndex, textureIndex, paletteIndex));
    }

    public setRandomComponents(): void {
        // TO-DO
    }

    public getEyeColor(): number {
        return this.eyeColor;
    }

    public setEyeColor(colorIndex: number): void {
        this.eyeColor = colorIndex;
    }

    public getHairColor(): MockBasePedHairColor {
        return this.hairColor;
    }

    public setHairColor(colorIndex: number, highlightColorIndex: number): void {
        this.hairColor = new MockBasePedHairColor(colorIndex, highlightColorIndex);
    }

    public clearTasks(_instantly?: boolean): void {
        // TO-DO: mocking tasks is going to be heelll
    }

    // TO-DO: wetness should reduce overtime
    public getWetnessHeight(): number {
        return this.wetnessHeight;
    }

    public setWetnessHeight(height: number): void {
        this.wetnessHeight = height;
    }

    public clearWetness(): void {
        this.wetnessHeight = 0;
    }

    public clearDecorations(): void {
        /* TO-DO: nothing to do here, no models are rendered in mocks,
         * i guess we can add a flag to test is decorations are cleared,
         * but who really needs to test it?
         */
    }

    public clearBlood(): void {
        // TO-DO: same as clearDecorations
    }
}

export class MockPed extends MockBasePed implements Ped {
    public readonly isDynamic: boolean = false;
}

export class MockPedPool extends MockEntityPool<MockPed> implements PedPool {
    public constructor(container: MockClientContainer) {
        super(container, (container, id) => new MockPed(container, id, 0, 0));
    }

    public spawn(model: string | number, position: Vector3, heading: number, dimension: number): MockPed {
        const ped = this.createEntity();

        if (isString(model)) {
            ped.model = this.container.joaat(model);
        } else {
            ped.model = model;
        }

        ped.position = position;
        ped.heading = heading;
        ped.dimension = dimension;

        return ped;
    }
}

export class MockBasePedHeadOverlay {
    public constructor(
        public index: number,
        public opacity: number,
        public firstColor: number,
        public secondColor: number
    ) {}
}

export class MockBasePedHeadBlend {
    public constructor(
        public shapeFirst: number,
        public shapeSecond: number,
        public skinFirst: number,
        public skinSecond: number,
        public shapeMix: number,
        public skinMix: number
    ) {}
}

export class MockBasePedProp {
    public constructor(
        public drawableIndex: number,
        public textureIndex: number
    ) {}
}

export class MockBasePedComponent {
    public constructor(
        public drawableIndex: number,
        public textureIndex: number,
        public paletteIndex: number
    ) {}
}

export class MockBasePedHairColor {
    public constructor(
        public colorIndex: number,
        public highlightColorIndex: number
    ) {}
}
