
function requestToPromise (request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = function ({ target }) {
      resolve(target.result)
    }
    request.onerror = function (error) {
      reject(error)
    }
  })
}

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

  fetchAll (name) {
    const transaction = this.database.transaction(name, 'readwrite')
    const store = transaction.objectStore(name)
    return requestToPromise(store.getAll())
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

export default Store
