/* globals self */
import onActivate from 'src/events/worker-activate'
import onInstall from 'src/events/worker-install'
import onFetch from 'src/events/worker-fetch'

self.addEventListener('activate', onActivate)
self.addEventListener('install', onInstall)
self.addEventListener('fetch', onFetch)
