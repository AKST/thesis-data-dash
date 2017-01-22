import { PromiseTimeout } from 'src/util/time'
import { ResponseNotOk } from 'src/store/util/data'

export function prepareError (error) {
  if (PromiseTimeout.isInstance(error)) {
    return { type: 'server:timeout', error }
  }
  else if (error instanceof ResponseNotOk) {
    return { type: 'fetch:network', error }
  }
  else {
    return { type: 'application', error }
  }
}
