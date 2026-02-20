import type { ForEachHandler } from '../interfaces/entity';
import type { Vector3 } from './vector';

export function isString(v: unknown): v is string {
    return typeof v === 'string';
}

export function isNumber(v: unknown): v is number {
    return typeof v === 'number';
}

export function isHandler<T>(v: unknown): v is ForEachHandler<T> {
    return typeof v === 'function';
}

export function isVector3(v: unknown): v is Vector3 {
    return (
        typeof v === 'object' &&
        v !== null &&
        typeof (v as Vector3).x === 'number' &&
        typeof (v as Vector3).y === 'number' &&
        typeof (v as Vector3).z === 'number'
    );
}
