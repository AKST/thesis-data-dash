/* globals caches, self */
import { CACHE_DATA_KEY } from 'src/util/constants/network'

const retain = [CACHE_DATA_KEY]

export function handle (event) {
  event.waitUntil(withEvent(event))
}

async function withEvent (event) {
  await self.clients.claim()
  console.log((await caches.keys()))
  await Promise.all((await caches.keys())
    .filter(key => !retain.includes(key))
    .map(key => caches.delete(key)))
}


export default handle
