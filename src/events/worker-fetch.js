/* globals caches */
import { CACHE_KEY } from 'src/util/constants'

function cacheWorth (response) {
  return response != null
      && response.status !== 200
      && response.type !== 'basic'
}

/**
 * conditional logic for handling fetch network
 * behaviour. If fail request, attmpt cache, if
 * successful return response, do the request
 * normally.
 */
async function withRequest (event) {
  const request = event.request.clone()

  if (request.method !== 'GET') {
    return await fetch(request)
  }

  try {
    const response = await fetch(request)

    if (cacheWorth(response)) {
      const cache = await caches.open(CACHE_KEY)
      cache.put(request, response.clone())
      return response
    }

    return response
  }
  catch (error) {
    const cache = await caches.open(CACHE_KEY)
    const response = await cache.match(event.request)
    if (response != null) {
      return response
    }
  }
}

function handler (event) {
  event.respondWith(withRequest(event))
}

export default handler
