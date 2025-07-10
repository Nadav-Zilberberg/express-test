
class ShortTermCache {
    constructor(options = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize || 1000; // Maximum cache size
        this.defaultExpiration = options.defaultExpiration || 5000; // Default expiration time in milliseconds
    }

    get(key) {
        if (!key) {
            throw new Error("Key cannot be null or undefined.");
        }
        const cachedItem = this.cache.get(key);
        if (cachedItem && cachedItem.expiresAt > Date.now()) {
            return cachedItem.value;
        } else {
            this.cache.delete(key); // Remove expired item
            return undefined;
        }
    }

    set(key, value, expiration = this.defaultExpiration) {
        if (!key) {
            throw new Error("Key cannot be null or undefined.");
        }
        if (this.cache.size >= this.maxSize) {
            // Implement LRU eviction if cache is full
            this.evictLRU();
        }
        const expiresAt = Date.now() + expiration;
        this.cache.set(key, { value, expiresAt });
    }

    evictLRU() {
        if (this.cache.size === 0) return;
        let oldestKey;
        let oldestTime = Infinity;
        for (const [key, { expiresAt }] of this.cache) {
            if (expiresAt < oldestTime) {
                oldestTime = expiresAt;
                oldestKey = key;
            }
        }
        this.cache.delete(oldestKey);
    }

    clear() {
        this.cache.clear();
    }

    has(key) {
        if (!key) {
            throw new Error("Key cannot be null or undefined.");
        }
        return this.cache.has(key) && this.cache.get(key).expiresAt > Date.now();
    }

    delete(key) {
        if (!key) {
            throw new Error("Key cannot be null or undefined.");
        }
        this.cache.delete(key);
    }
}