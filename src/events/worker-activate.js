/* globals caches, self */

export function handle (event) {
  event.waitUntil(withEvent(event))
}

async function withEvent (event) {
  const cacheKeys = await caches.keys()
  await Promise.all(cacheKeys.map(key => caches.delete(key)))
  await self.clients.claim()
}

export default handle
