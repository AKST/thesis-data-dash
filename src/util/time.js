export function staleData (time) {
  // const elapsed = Date.now() - time
  // return elapsed > (1000 * 60 * 60 * 24 * 5)
  return true
}

const promiseTimeoutMessage = 'Promise timed out'

export class PromiseTimeout extends Error {
  constructor (promise = null) {
    super(promiseTimeoutMessage)
    this.promise = promise
  }

  static isInstance (e) {
    return e.message === promiseTimeoutMessage
  }
}

export function timeout (promise, maxtime) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new PromiseTimeout(promise)), maxtime)
    promise.then(result => {
      clearTimeout(id)
      resolve(result)
    }, error => {
      clearTimeout(id)
      reject(error)
    })
  })
}

