/* globals caches, self */

async function withEvent (event) {
  const cacheKeys = await caches.keys()
  await Promise.all(cacheKeys.map(key => caches.delete(key)))
  await self.clients.claim()
}

export function handle (event) {
  event.waitUntil(withEvent(event))
}

export default handle
