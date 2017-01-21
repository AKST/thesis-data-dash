/* globals location */

const root = location.origin

export const CACHE_ONCE_KEY = 'THESIS-CACHE--once_0.1'
export const CACHE_OFFLINE_KEY = 'THESIS-CACHE--offline_0.1'

export const CACHE_OFFLINE = [
  root,
  `${root}/api/package`,
  `${root}/api/average?type=size`,
  `${root}/api/average?type=time`
]

export const CACHE_ONCE = [
  /$http:\/\/fonts\.gstatic\.com/
]

export default { CACHE_ONCE_KEY, CACHE_OFFLINE_KEY, CACHE_OFFLINE, CACHE_ONCE }
