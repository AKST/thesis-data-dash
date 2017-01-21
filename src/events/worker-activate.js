/* globals caches, self */

async function withEvent (event) {
  const cacheKeys = await caches.keys()
  const deletes = cacheKeys.map(key => caches.delete(key))
  await Promise.all(deletes)
  await self.clients.claim()
}

export function handle (event) {
  event.waitUntil(withEvent(event))
}

export default handle
