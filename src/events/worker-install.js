/* globals caches */
import { CACHE_KEY, URLS_TO_CACHE } from 'src/util/constants'

async function initCache () {
  const cache = await caches.open(CACHE_KEY)
  return await cache.addAll(URLS_TO_CACHE)
}

export function handler (event) {
  event.waitUntil(initCache())
}

export default handler
