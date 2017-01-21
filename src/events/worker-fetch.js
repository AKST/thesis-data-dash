/* globals caches, location */
import { CACHE_KEY, CACHE_ONCE } from 'src/util/constants'

function shouldCacheResponse (response) {
  return response != null && response.ok
}

function cacheOnEach (request) {
  return request.url.startsWith(location.origin)
      && !request.url.endsWith('/__webpack_hmr')
}

function requestOnce (request) {
  return CACHE_ONCE.some(r => request.url.match(r))
}

async function cacheForOffline (request, response) {
  const cache = await caches.open(CACHE_KEY)
  cache.put(request, response.clone())
}



/**
 * conditional logic for handling fetch network
 * behaviour. If fail request, attmpt cache, if
 * successful return response, do the request
 * normally.
 */
async function withRequest (event) {
  const request = event.request
  const requestClone = request.clone()
  try {
    // any GET request that we don't want more than once
    if (requestOnce(request)) {
      const cached = await caches.match(request)
      if (cached != null) return cached

      const response = await fetch(requestClone)
      if (shouldCacheResponse(response)) await cacheForOffline(request, response)

      return response
    }
    // any GET request within our domain
    else if (cacheOnEach(request)) {
      const response = await fetch(requestClone)
      if (shouldCacheResponse) await cacheForOffline(request, response)
      return response
    }
    else {
      return await fetch(request)
    }
  }
  catch (error) {
    const cached = await caches.match(request)
    if (cached != null) {
      return cached
    }
    else {
      throw error
    }
  }
}

function handler (event) {
  event.respondWith(withRequest(event))
}

export default handler
