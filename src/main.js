import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Root from 'src/root'
import store from 'src/store'
import router from 'src/router'

import Navlinks, { Link } from 'src/services/nav-links'

Vue.use(VueRouter)
Vue.use(Vuex)

export default new Vue({
  store: new Vuex.Store(store),
  router: new VueRouter(router),

  el: '#app',
  template: '<root/>',
  components: { Root },

  created () {
    this.$nav = new Navlinks([
      new Link('/releases', 'Releases'),
      new Link('/projects', 'Projects')
    ])
  }
})
