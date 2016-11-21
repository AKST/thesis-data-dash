import app from 'src/init/app'
import store from 'src/init/store'
import router from 'src/init/router'
import loader from 'webfontloader'

loader.load({
  google: {
    families: ['Roboto+Mono:100,100i,300,300i,400,400i,500,500i,700,700i']
  }
})

export default app({ store, router })
