
export const storeName = 'thesis.akst.io'
export const version = 5
let upgrade = false

/**
 * wrapper class around the store
 */
export class Store {
  constructor (database) {
    this.database = database
  }

  fetch (name, index) {
    const transaction = this.database.transaction(name, 'readwrite')
    const store = transaction.objectStore(name)
    return new Promise((resolve, reject) => {
      const request = store.get(index)
      request.onsuccess = function () {
        resolve(request.result)
      }
      request.onerror = function (error) {
        reject(error)
      }
    })
  }

  insert (name, item) {
    const transaction = this.database.transaction(name, 'readwrite')
    const store = transaction.objectStore(name)
    return this._withStoreInsert(store, item)
  }

  insertAll (name, items) {
    const transaction = this.database.transaction(name, 'readwrite')
    const store = transaction.objectStore(name)
    return Promise.all(items.map(item => this._withStoreInsert(store, item)))
  }

  _withStoreInsert (store, item) {
    console.log(item)
    return new Promise((resolve, reject) => {
      const request = store.put(item)
      request.onsuccess = function () {
        resolve()
      }
      request.onerror = function (error) {
        reject(error)
      }
    })
  }
}

function withUpgrade () {
  const { objectStoreNames: names } = this.result

  if (!names.contains('meta')) {
    this.result.createObjectStore('meta', { keyPath: 'name' })
  }

  if (!names.contains('packages')) {
    this.result.createObjectStore('packages', { keyPath: 'id' })
  }

  if (!names.contains('averages')) {
    this.result.createObjectStore('averages', { keyPath: 'id' })
  }
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
    packageMeta
      .then(() => averageMeta)
      .then(() => resolve(store))
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

