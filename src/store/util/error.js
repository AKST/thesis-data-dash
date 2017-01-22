import { PromiseTimeout } from 'src/util/time'

export function prepareError (error) {
  if (PromiseTimeout.isInstance(error)) {
    return { type: 'server:timeout', error }
  }
  else {
    return { type: 'application', error }
  }
}
