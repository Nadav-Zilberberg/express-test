
class ShortTermMemoryCache {
    constructor(options = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize || 1000;
        this.defaultExpiration = options.defaultExpiration || 5000; // 5 seconds
    }

    get(key) {
        if (!this.cache.has(key)) {
            return null;
        }

        const entry = this.cache.get(key);

        if (entry.expiresAt < Date.now()) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    set(key, value, expiration = this.defaultExpiration) {
        if (this.cache.size >= this.maxSize) {
            // Implement LRU eviction if maxSize is reached
            this.evictLRU();
        }
        const expiresAt = Date.now() + expiration;
        this.cache.set(key, { value, expiresAt });
    }

    evictLRU() {
        // Find the least recently used key (not implemented yet)
        // For now, just delete the first item
        const firstKey = this.cache.keys().next().value;
        if (firstKey) {
            this.cache.delete(firstKey);
        }
    }

    clear() {
        this.cache.clear();
    }
}

module.exports = ShortTermMemoryCache;