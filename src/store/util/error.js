import { PromiseTimeout } from 'src/util/time'

export function prepareError (e) {
  if (PromiseTimeout.isInstance(e)) {
    return { type: 'server:timeout', error: e }
  }
  else {
    return { type: 'application', error: e }
  }
}
