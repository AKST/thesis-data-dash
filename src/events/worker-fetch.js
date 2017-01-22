/* globals caches, location */
import {
  API_REGEX,

  CACHE_DATA_KEY,
  CACHE_OFFLINE_KEY,
  CACHE_ONCE_KEY,

  CACHE_ONCE_URLS
} from 'src/util/constants/network'

function handler (event) {
  event.respondWith(withRequest(event))
}

/**
 * conditional logic for handling fetch network
 * behaviour. If fail request, attmpt cache, if
 * successful return response, do the request
 * normally.
 */
async function withRequest ({ request }) {
  try {
    // pass the request to the first predicate
    // that is satisified, then pass the request to it
    for (const { predicate, handler } of branches) {
      if (predicate(request)) return await handler(request)
    }

    // if none of the predicates are satisified then
    // just fetch the damn resource normally...
    return await fetch(request)
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

////////////////////////////////////////////////////
// Branches
////////////////////////////////////////////////////

const branches = [
  { predicate: requestOnce, handler: cacheOnFirst },
  { predicate: cacheOnEach, handler: fetchThenCache }
]

/**
 * Ensure this is only called once, and then cached.
 * Any subsequent calls utilise the cache
 */
async function cacheOnFirst (request) {
  const cached = await caches.match(request)
  if (cached != null) return cached

  const response = await fetch(request.clone())
  if (shouldCacheResponse(response)) {
    await cacheForOffline(request, response, CACHE_ONCE_KEY)
  }

  return response
}

/**
 * Fetches a result then caches it, if the status is
 * >= 500, and a cached result is available. The
 * cached result is used.
 */
async function fetchThenCache (request) {
  const response = await fetch(request.clone())
  // if the server failed, we'll return a stale result
  if (response.status >= 500) {
    const cached = await caches.match(request)
    return (cached != null) ? cached : response
  }
  // if we can cache it, ayeeeee why not cache it amirite?
  else if (shouldCacheResponse(response)) {
    await cacheForOffline(request, response, detemineCacheKey(request))
    return response
  }
  // fuck it, lol. let's just give them what they asked for
  else {
    return response
  }
}

////////////////////////////////////////////////////
// UTILITY
////////////////////////////////////////////////////

function detemineCacheKey (request) {
  if (request.url.match(API_REGEX)) {
    return CACHE_DATA_KEY
  }
  else {
    return CACHE_OFFLINE_KEY
  }
}

function shouldCacheResponse (response) {
  return response != null && response.ok
}

function cacheOnEach (request) {
  return request.url.startsWith(location.origin)
      && !request.url.endsWith('/__webpack_hmr')
}

function requestOnce (request) {
  return CACHE_ONCE_URLS.some(r => request.url.match(r))
}

async function cacheForOffline (request, response, key) {
  const cache = await caches.open(key)
  cache.put(request, response.clone())
}

export default handler
