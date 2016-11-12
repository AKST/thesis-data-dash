import Vue from 'vue'
import Vuex from 'vuex'
import VueD3 from 'vue-d3'
import VueRouter from 'vue-router'

import Root from 'src/components/root'

export default ({ store, router }) => {
  Vue.use(VueRouter)
  Vue.use(VueD3)
  Vue.use(Vuex)

  return new Vue({
    store: new Vuex.Store(store),
    router: new VueRouter(router),

    el: '#app',
    template: '<root/>',
    components: { Root }
  })
}
