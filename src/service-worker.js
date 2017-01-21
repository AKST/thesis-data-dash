/* globals self */
import onInstall from 'src/events/worker-install'
import onFetch from 'src/events/worker-fetch'

self.addEventListener('install', onInstall)
self.addEventListener('fetch', onFetch)
