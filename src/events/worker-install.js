/* globals self, caches */
import { CACHE_OFFLINE_KEY, CACHE_OFFLINE } from 'src/util/constants'

async function initCache () {
  await self.skipWaiting()
  const cache = await caches.open(CACHE_OFFLINE_KEY)
  await cache.addAll(CACHE_OFFLINE)
}

export function handler (event) {
  event.waitUntil(initCache())
}

export default handler
