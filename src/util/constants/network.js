/* globals location */

const root = location.origin

export const CACHE_ONCE_KEY = 'THESIS-CACHE--once'
export const CACHE_DATA_KEY = 'THESIS-CACHE--data'
export const CACHE_OFFLINE_KEY = 'THESIS-CACHE--offline'

export const CACHE_ON_INIT = [
  root,
  `${root}/api/package`,
  `${root}/api/average?type=size`,
  `${root}/api/average?type=time`
]

export const CACHE_ONCE_URLS = [
  /$http:\/\/fonts\.gstatic\.com/
]

export const API_REGEX = new RegExp(`$http:\\/\\/${root}/api*`)

export default {
  CACHE_ONCE_KEY,
  CACHE_OFFLINE_KEY,
  CACHE_DATA_KEY,

  CACHE_ON_INIT,
  CACHE_ONCE_URLS,

  API_REGEX
}
