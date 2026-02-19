import type {
    PedComponentType,
    PedFaceFeatureType,
    PedHeadOverlayType,
    PedPropType,
    Vector3,
} from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from './entity';
import type { PedBoneType, PedDeathType, PedFlagType } from '@/enums/ped';

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
    get3dBoneCoords(bone: PedBoneType, offset?: Vector3): Vector3;

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
     * Enables/disables the given flag on the current ped.
     * @param flagType Target flag.
     * @param state Target state.
     */
    setConfigFlag(flagType: PedFlagType, state: boolean): void;

    /**
     * Returns the index of the given head overlay on the current ped.
     * @param overlayType Target head overlay.
     */
    getHeadOverlay(overlayType: PedHeadOverlayType): number;

    /**
     * Updates the given head overlay on the current ped.
     *
     * Visit [this page](https://wiki.rage.mp/wiki/Makeup_Colors) for all color indices.
     *
     * Only works with freemode models:
     * - `mp_m_freemode_01`
     * - `mp_f_freemode_01`
     * @param overlayType Target head overlay.
     * @param index Target index.
     * @param opacity Value ranging from 0.0 to 1.0.
     * @param firstColor Target first color index.
     * @param secondColor Target second color index.
     */
    setHeadOverlay(
        overlayType: PedHeadOverlayType,
        index: number,
        opacity: number,
        firstColor: number,
        secondColor: number
    ): void;

    /**
     *
     * Updates the given head blend values.
     *
     * Only works with freemode models:
     * - `mp_m_freemode_01`
     * - `mp_f_freemode_01`
     * @param shapeFirst
     * @param shapeSecond
     * @param skinFirst
     * @param skinSecond
     * @param shapeMix
     * @param skinMix
     */
    setHeadBlend(
        shapeFirst: number,
        shapeSecond: number,
        skinFirst: number,
        skinSecond: number,
        shapeMix: number,
        skinMix: number
    ): void;

    /**
     * Updates the face feature of the current ped.
     *
     * Only works with freemode models:
     * - `mp_m_freemode_01`
     * - `mp_f_freemode_01`
     * @param faceFeature Target feature.
     * @param scale Value ranging from -1.0 to 1.0.
     */
    setFaceFeature(faceFeature: PedFaceFeatureType, scale: number): void;

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
     * Updates the eye color of the current ped.
     *
     * Only works with freemode models:
     * - `mp_m_freemode_01`
     * - `mp_f_freemode_01`
     * @param colorIndex Values ranging from 0 to 31.
     */
    setEyeColor(colorIndex: number): void;

    /**
     * Updates the hair color of the current ped.
     *
     * Only works with freemode models:
     * - `mp_m_freemode_01`
     * - `mp_f_freemode_01`
     * @param colorIndex Primary color fo the hair.
     * @param highlightColorIndex Highlight color of the hair.
     */
    setHairColor(colorIndex: number, highlightColorIndex: number): void;

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

export interface Ped extends BasePed {
    /**
     * Whether or not the ped is dynamic.
     *
     * A dynamic ped means that the ped can be damaged, killed, pushed, etc.
     */
    readonly isDynamic: boolean;
}

export interface PedPool extends EntityPool<Ped> {
    /**
     * Spawns a new ped.
     * @param model Target model ID or hash.
     * @param position Position in the 3D world.
     * @param heading Heading in the 3D world (alias for Z-axis of rotation).
     * @param dimension Target dimension.
     */
    spawn(model: string | number, position: Vector3, heading: number, dimension: number): Ped;
}
