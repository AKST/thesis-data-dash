/* globals Request, caches */
import { stringify as queryToString } from 'query-string'

export function request (path, params) {
  const url = `${path}?${queryToString(params)}`
  return new Request(url, { method: 'GET' })
}

export async function fetchJson (request) {
  const r = await fetch(request)
  return await r.json()
}

export async function checkCachedJson (request) {
  if (typeof caches !== 'undefined') {
    const c = await caches.match(request)
    return c != null ? (await c.json()) : c
  }
  else {
    return null
  }
}
