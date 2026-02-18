import type { PedComponentType, PedHeadOverlayType, PedPropType, Vector3 } from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from './entity';
import type { PedBoneType, PedDeathType, PedFlagType } from '@/enums/ped';

export interface PedHeadBlend {
    readonly shapeFirst: number;
    readonly shapeSecond: number;
    readonly skinFirst: number;
    readonly skinSecond: number;
    readonly shapeMix: number;
    readonly skinMix: number;
}

/**
 * Incomplete.
 *
 * Missing:
 * - Applying blood/decals
 * - All tasks
 */
export interface BasePed extends Entity {
    /**
     * Whether or not the current ped can ragdoll.
     */
    readonly canRagdoll: boolean;

    /**
     * Head blend data of the ped.
     *
     * This object is immutable.
     * It can only be updated using `setHeadBlend()` method.
     *
     * Only works with freemode models:
     * - `mp_m_freemode_01`
     * - `mp_f_freemode_01`
     */
    readonly headBlend: PedHeadBlend;

    /**
     * Maximal health of the current ped.
     */
    maxHealth: number;

    /**
     * Money of the current ped.
     */
    money: number;

    /**
     * Applies damage to the current ped.
     * @param amount Amount of damage.
     * @param includeArmor Whether or not to include armor in damage calculation.
     */
    applyDamage(amount: number, includeArmor: boolean): void;

    /**
     * Whether or not current ped can see the given target.
     * @param targetHandle Handle of the target.
     */
    canSeeTarget(targetHandle: number): boolean;

    /**
     * Clones the current ped.
     * @returns Handle of the cloned ped.
     */
    clone(): number;

    /**
     * Returns the 3D coordinates of the given bone.
     * @param bone Target bone.
     */
    get3dBoneCoords(bone: PedBoneType): Vector3;

    /**
     * Returns the bone index of the given bone.
     *
     * Used for other natives that require the bone index instead of ID.
     *
     * @param bone Target bone.
     */
    getBoneIndex(bone: PedBoneType): number;

    /**
     * Returns the cause of the current's ped death.
     */
    getCauseOfDeath(): PedDeathType;

    /**
     * Returns whether or not the given flag is active on the current ped.
     * @param flagType Target flag.
     */
    getConfigFlag(flagType: PedFlagType): boolean;

    /**
     * Returns the index of the given head overlay on the current ped.
     * @param overlayType Target head overlay.
     */
    getHeadOverlay(overlayType: PedHeadOverlayType): number;

    /**
     * Updates the given head overlay on the current ped.
     * @param overlayType Target head overlay.
     * @param index Target index.
     */
    setHeadOverlay(overlayType: PedHeadOverlayType, index: number): number;

    /**
     * Updates the given head blend values.
     * @param headBlend New head blend values.
     */
    setHeadBlend(headBlend: Partial<PedHeadBlend>): void;

    /**
     * Returns the drawable index of the given prop type.
     * @param prop Targer prop.
     */
    getPropDrawable(prop: PedPropType): number;

    /**
     * Returns the texture index of the given prop type.
     * @param prop Targer prop.
     */
    getPropTexture(prop: PedPropType): number;

    /**
     * Sets the drawable and texture indices of the given prop type.
     * @param prop Targer prop.
     * @param drawableIndex Target drawable index.
     * @param textureIndex Target texture index.
     */
    setProp(prop: PedPropType, drawableIndex: number, textureIndex: number): void;

    /**
     * Removed the given prop from the ped.
     * @param prop Target prop.
     */
    clearProp(prop: PedPropType): void;

    /**
     * Clears all props from the ped.
     */
    clearProps(): void;

    /**
     * Dresses the ped in a random prop variation.
     */
    setRandomProps(): void;

    /**
     * Sets the given component for the current ped.
     * @param component Target component.
     * @param drawableIndex Target drawable index.
     * @param textureIndex Target texture index.
     * @param paletteIndex Target palette index.
     */
    setComponent(component: PedComponentType, drawableIndex: number, textureIndex: number, paletteIndex: number): void;

    /**
     * Dresses the ped in a random component variation.
     */
    setRandomComponents(): void;

    /**
     * Clears all tasks of the current ped.
     * @param instantly Whether or not to clear the tasks instantly.
     */
    clearTasks(instantly?: boolean): void;

    /**
     * Set the wetness height of the current ped.
     * @param height Height of the water stain.
     */
    setWetnessHeight(height: number): void;

    /**
     * Clears the wetness from the current ped.
     */
    clearWetness(): void;

    /**
     * Clears all decorations from the current ped.
     */
    clearDecorations(): void;

    /**
     * Clears all blood from the current ped.
     */
    clearBlood(): void;
}

export interface Ped extends BasePed {}

export interface PedPool extends EntityPool<Ped> {}
