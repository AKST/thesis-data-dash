import Store from 'src/services/cache/store'

let upgrade = false

export const storeName = 'thesis.akst.io'
export const version = 6

function withUpgrade ({ currentTarget: { transaction } }) {
  const { objectStoreNames: names } = this.result

  if (!names.contains('meta')) {
    this.result.createObjectStore('meta', { keyPath: 'name' })
  }

  const packages = !names.contains('packages')
    ? this.result.createObjectStore('packages', { keyPath: 'id' })
    : transaction.objectStore('packages')

  packages.createIndex('name', 'name', { unique: true })

  const averages = !names.contains('averages')
    ? this.result.createObjectStore('averages', { keyPath: 'id' })
    : transaction.objectStore('averages')

  averages.createIndex('total_size', 'total_size', { unique: false })
  averages.createIndex('average_time', 'average_time', { unique: false })

  upgrade = true
}

function withError (reject) {
  reject(new Error('store failed to load'))
}

function withSuccess (resolve) {
  const store = new Store(this.result)

  async function init (item) {
    const result = await store.fetch('meta', item.name)
    if (result == null) {
      await store.insert('meta', item)
    }
  }

  // if an upgrade the store is initialised
  if (upgrade) {
    const packageMeta = init({ name: 'packages', fetchedLast: 0 })
    const averageMeta = init({ name: 'averages', fetchedLast: 0 })
    packageMeta.then(() => averageMeta).then(() => resolve(store))
  }

  // otherwise it's returned as per normal
  else {
    resolve(store)
  }
}

const IndexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB

let instance = null

export function getStore () {
  if (instance != null) { return instance }
  instance = new Promise((resolve, reject) => {
    const open = IndexedDB.open(storeName, version)
    open.onupgradeneeded = withUpgrade.bind(open)
    open.onsuccess = withSuccess.bind(open, resolve)
    open.onerror = withError.bind(open, reject)
  })
  return instance
}

export default getStore

