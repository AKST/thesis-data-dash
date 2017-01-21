/* globals location */

const root = location.origin

export const CACHE_KEY = 'THESIS-CACHE-0.1'

export const CACHE_ONE_LOAD = [
  root,
  `${root}/api/package`,
  `${root}/api/average?type=size`,
  `${root}/api/average?type=time`
]

export const CACHE_ONCE = [
  /$http:\/\/fonts\.gstatic\.com/
]

export default { CACHE_KEY }
