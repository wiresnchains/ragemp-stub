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
