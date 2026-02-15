import type { Vector3 } from './vector';

export type ForEachHandler<T> = (iterable: T) => void;

export function joaat(plainText: string) {
    const lowerCase = plainText.toLowerCase();

    let hash = 0;

    for (let i = 0; i < lowerCase.length; i++) {
        hash += lowerCase.charCodeAt(i);
        hash += hash << 10;
        hash ^= hash >>> 6;
    }

    hash += hash << 3;
    hash ^= hash >>> 11;
    hash += hash << 15;

    return hash >>> 0;
}

export function createJoaatCache() {
    const cache: Map<string, number> = new Map();

    return {
        cache,
        get: (plainText: string) => {
            const cached = cache.get(plainText);
            if (cached) {
                return cached;
            }

            const hash = joaat(plainText);
            cache.set(plainText, hash);
            return hash;
        },
    };
}

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
