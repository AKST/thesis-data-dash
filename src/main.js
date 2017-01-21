import app from 'src/init/app'
import store from 'src/init/store'
import router from 'src/init/router'
import loader from 'webfontloader'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'

const registration = 'serviceWorker' in navigator
  ? runtime.register()
  : Promise.reject(new Error('`serviceWorker` is not in `navigator`'))

loader.load({
  google: {
    families: ['Roboto+Mono:100,100i,300,300i,400,400i,500,500i,700,700i']
  }
})

export default app({ store, router, sw: registration })
