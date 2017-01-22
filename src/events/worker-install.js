/* globals self, caches */
import { CACHE_OFFLINE_KEY, CACHE_OFFLINE } from 'src/util/constants'

async function initCache () {
  await self.skipWaiting()
  try {
    const cache = await caches.open(CACHE_OFFLINE_KEY)
    await cache.addAll(CACHE_OFFLINE)
  }
  catch (error) {
    console.warn(error)
  }
}

export function handler (event) {
  event.waitUntil(initCache())
}

export default handler
