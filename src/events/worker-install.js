/* globals self, caches */
import {
  CACHE_OFFLINE_KEY,
  CACHE_DATA_KEY,
  CACHE_ONCE_KEY,

  CACHE_ON_INIT
} from 'src/util/constants/network'

async function initCache () {
  await self.skipWaiting()
  try {
    const [cache] = await Promise.all([
      caches.open(CACHE_OFFLINE_KEY),
      caches.open(CACHE_DATA_KEY),
      caches.open(CACHE_ONCE_KEY),
    ])
    await cache.addAll(CACHE_ON_INIT)
  }
  catch (error) {
    console.warn(error)
  }
}

export function handler (event) {
  event.waitUntil(initCache())
}

export default handler
