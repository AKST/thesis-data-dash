import getStore from 'src/services/cache/init'
import { staleData as stale, timeout, PromiseTimeout } from 'src/util/time'

/**
 * before making a request checks if the stores meta entry,
 * indicated that it's stale or not, if so request new
 * data, and replace update the store and the meta entry
 */
export async function cacheFetchAll ({ url, store: storeName }) {
  const store = await getStore()
  const meta = await store.fetch('meta', storeName)

  if (stale(meta.fetchedLast)) {
    const request = await timeout(fetch(url), 2000)
    const result = await request.json()

    await Promise.all([
      store.insertAll(storeName, result.data),
      store.insert('meta', { ...meta, fetchedLast: Date.now() })
    ])

    return result
  }
  else {
    return await store.fetchAll(storeName)
  }
}

export function prepareError (e) {
  if (PromiseTimeout.isInstance(e)) {
    return { type: 'server:timeout', error: e }
  }
  else {
    return { type: 'application', error: e }
  }
}

export default { cacheFetchAll, prepareError }
