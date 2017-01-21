/* globals self, caches */
import { CACHE_KEY, CACHE_ONE_LOAD } from 'src/util/constants'

async function initCache () {
  const cache = await caches.open(CACHE_KEY)
  await self.skipWaiting()
  await cache.addAll(CACHE_ONE_LOAD)
}

export function handler (event) {
  event.waitUntil(initCache())
}

export default handler
