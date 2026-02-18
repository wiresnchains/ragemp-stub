import type { BasePed, Ped, PedPool } from '@/interfaces/ped';
import { RageEntity, RageEntityPool } from './entity';
import type { PedBoneType, PedDeathType, PedFlagType } from '@/enums/ped';
import {
    isString,
    joaat,
    PedComponentType,
    PedFaceFeatureType,
    PedHeadOverlayType,
    PedPropType,
    Vector3,
} from 'ragemp-atlas/shared';

export class RageBasePed<TEntity extends PedMpBase = PedMpBase> extends RageEntity<TEntity> implements BasePed {
    public get canRagdoll(): boolean {
        return this.entity.canRagdoll();
    }

    public get maxHealth(): number {
        return this.entity.getMaxHealth();
    }

    public set maxHealth(maxHealth: number) {
        this.entity.setMaxHealth(maxHealth);
    }

    public get money(): number {
        return this.entity.getMoney();
    }

    public set money(money: number) {
        this.entity.setMoney(money);
    }

    public applyDamage(amount: number, includeArmor: boolean): void {
        this.entity.applyDamageTo(amount, includeArmor);
    }

    public canSeeTarget(targetHandle: number): boolean {
        return this.entity.canInCombatSeeTarget(targetHandle);
    }

    public clone(): number {
        return this.entity.clone(this.heading, false, false);
    }

    public get3dBoneCoords(bone: PedBoneType, offset: Vector3 = new Vector3()): Vector3 {
        const coords = this.entity.getBoneCoords(bone, offset.x, offset.y, offset.z);
        return new Vector3(coords.x, coords.y, coords.z);
    }

    public getBoneIndex(bone: PedBoneType): number {
        return this.entity.getBoneIndex(bone);
    }

    public getCauseOfDeath(): PedDeathType {
        return this.entity.getCauseOfDeath();
    }

    public getConfigFlag(flagType: PedFlagType): boolean {
        return this.entity.getConfigFlag(flagType, true);
    }

    public setConfigFlag(flagType: PedFlagType, state: boolean): void {
        this.entity.setConfigFlag(flagType, state);
    }

    public getHeadOverlay(overlayType: PedHeadOverlayType): number {
        return this.entity.getHeadOverlayValue(overlayType);
    }

    public setHeadOverlay(
        overlayType: PedHeadOverlayType,
        index: number,
        opacity: number,
        firstColor: number,
        secondColor: number
    ): void {
        this.entity.setHeadOverlay(overlayType, index, opacity, firstColor, secondColor);
    }

    public setHeadBlend(
        shapeFirst: number,
        shapeSecond: number,
        skinFirst: number,
        skinSecond: number,
        shapeMix: number,
        skinMix: number
    ): void {
        this.entity.setHeadBlendData(shapeFirst, shapeSecond, 0, skinFirst, skinSecond, 0, shapeMix, skinMix, 0, false);
    }

    public setFaceFeature(faceFeature: PedFaceFeatureType, scale: number): void {
        this.entity.setFaceFeature(faceFeature, scale);
    }

    public getPropDrawable(prop: PedPropType): number {
        return this.entity.getPropIndex(prop);
    }

    public getPropTexture(prop: PedPropType): number {
        return this.entity.getPropTextureIndex(prop);
    }

    public setProp(prop: PedPropType, drawableIndex: number, textureIndex: number): void {
        this.entity.setPropIndex(prop, drawableIndex, textureIndex, true);
    }

    public clearProp(prop: PedPropType): void {
        this.entity.clearProp(prop);
    }

    public clearProps(): void {
        this.entity.clearAllProps();
    }

    public setRandomProps(): void {
        this.entity.setRandomProps();
    }

    public setComponent(
        component: PedComponentType,
        drawableIndex: number,
        textureIndex: number,
        paletteIndex: number
    ): void {
        this.entity.setComponentVariation(component, drawableIndex, textureIndex, paletteIndex);
    }

    public setRandomComponents(): void {
        this.entity.setRandomComponentVariation(false);
    }

    public setEyeColor(colorIndex: number): void {
        this.entity.setEyeColor(colorIndex);
    }

    public setHairColor(colorIndex: number, highlightColorIndex: number): void {
        this.entity.setHairColor(colorIndex, highlightColorIndex);
    }

    public clearTasks(instantly?: boolean): void {
        if (instantly) {
            this.entity.clearTasksImmediately();
        } else {
            this.entity.clearTasks();
        }
    }

    public setWetnessHeight(height: number): void {
        this.entity.setWetnessHeight(height);
    }

    public clearWetness(): void {
        this.entity.clearWetness();
    }

    public clearDecorations(): void {
        this.entity.clearDecorations();
    }

    public clearBlood(): void {
        this.entity.clearBloodDamage();
    }
}

export class RagePed extends RageBasePed<PedMp> implements Ped {
    private static pedMap: Map<PedMp, RagePed> = new Map();

    public static fromPed(ped: PedMp): RagePed {
        let abstractPed = this.pedMap.get(ped);
        if (abstractPed) {
            return abstractPed;
        }

        return new RagePed(ped);
    }

    private constructor(ped: PedMp) {
        super(ped);
        RagePed.pedMap.set(ped, this);
    }

    public get isDynamic(): boolean {
        return this.entity.isDynamic;
    }
}

export class RagePedPool extends RageEntityPool<PedMp, PedMpPool, RagePed> implements PedPool {
    public constructor() {
        super(mp.peds, RagePed.fromPed);
    }

    public spawn(model: string | number, position: Vector3, heading: number, dimension: number): Ped {
        let modelHash: number = 0;

        if (isString(model)) {
            modelHash = joaat(model);
        } else {
            modelHash = model;
        }

        return RagePed.fromPed(
            this.pool.new(modelHash, new mp.Vector3(position.x, position.y, position.z), heading, dimension)
        );
    }
}
