const LRU = require('lru-cache');
let cache = new LRU({ max: 500, ttl: 1000 * 60 * 5 });

module.exports = {
  get: async (k) => cache.get(k),
  set: async (k, v, ttl = 300) => cache.set(k, v, { ttl: ttl * 1000 }),
  del: async (k) => cache.delete(k)
};
